const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/login`));

app.use((request, response) => {
   const userId = request.body.userid || request.query.userid;
   const userPassword = request.body.password || request.query.password;
   
   response.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
   response.write('<h1>Login ID와 PW 결과 값 입니다.</h1>');
   response.write(`<div><p>${userId}</p></div>`);
   response.end(JSON.stringify(request.body, null, 2));
});

app.listen(3000, ()=>{
    console.log('Server is running port 3000!');
});