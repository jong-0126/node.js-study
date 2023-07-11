//request로 구글 크롤링하기

const request = require("request");

request({
    url: 'http://www.google.com/',
    method: 'GET',
}, (error, response, body) => console.log(body));