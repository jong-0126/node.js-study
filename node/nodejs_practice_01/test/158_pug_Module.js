const pug = require('pug');
const fs = require('fs');
const http = require('http');

http.createServer((request, response) => {
    fs.readFile('158_pug_example.pug', 'utf-8', (error, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        const fn = pug.compile(data);
        response.end(fn({
            table_name: 'Multiplication table 19 X ?',
            number: '19',
        }));
    });
}).listen(50000, () =>{
    console.log('서버가 동작중입니다.');
});