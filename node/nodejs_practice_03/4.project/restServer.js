const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');

let users = {}; // 데이터 저장용
let session = {};

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    const worker = cluster.fork({ users, session });

    // 워커 프로세스로 users, session 객체 전송
    worker.send({ users, session });
  }

  // 워커가 종료되었을 때
  cluster.on('exit', (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log('code', code, 'signal', signal);
    cluster.fork({ users, session });
  });
} else {
  // 워커 프로세스일 경우

  process.on('message', (message) => {
    users = message.users;
    session = message.session;
  });

  http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    try {
      if (req.url.startsWith('/login')) {
        const url = new URL(req.url, 'http://localhost:8082');
        const name = url.searchParams.get('name');
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();
        session[uniqueInt] = {
          name,
          expires,
        };
        res.writeHead(302, {
          Location: '/',
          'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
      } else if (cookies.session && session[cookies.session]?.expires > new Date()) {
        if (req.method === 'GET') {
          if (req.url === '/') {
            const data = await fs.readFile(path.join(__dirname, 'home.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
          } else if (req.url === '/about') {
            const data = await fs.readFile(path.join(__dirname, 'about.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
          } else if (req.url === '/listPage') {
            const data = await fs.readFile(path.join(__dirname, 'listPage.html'));
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
          } else if (req.url === '/users') {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(users));
          } else {
            try {
              const data = await fs.readFile(path.join(__dirname, req.url));
              res.end(data);
            } catch (err) {
              res.writeHead(404);
              res.end('NOT FOUND');
            }
          }
        } else if (req.method === 'POST') {
          if (req.url === '/user') {
            let body = '';
            req.on('data', (data) => {
              body += data;
            });
            req.on('end', () => {
              console.log('POST 본문(Body):', body);
              const { name } = JSON.parse(body);
              const id = Date.now();
              users[id] = name;
              res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
              res.end('등록 성공');
            });
          }
        } else if (req.method === 'PUT') {
          if (req.url.startsWith('/user/')) {
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data) => {
              body += data;
            });
            req.on('end', () => {
              console.log('PUT 본문(Body):', body);
              users[key] = JSON.parse(body).name;
              res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
              res.end(JSON.stringify(users));
            });
          }
        } else if (req.method === 'DELETE') {
          if (req.url.startsWith('/user/')) {
            const key = req.url.split('/')[2];
            delete users[key];
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(JSON.stringify(users));
          }
        } else {
          res.writeHead(404);
          res.end('NOT FOUND');
        }
      } else {
        const data = await fs.readFile(path.join(__dirname, 'loginPage.html'));
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }).listen(8082, () => {
    console.log(`${process.pid}번 워커 실행`);
    console.log('8082번 포트에서 서버 대기 중입니다');
  });
}
