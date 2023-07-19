const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');


//app.use(morgan('dev'));
app.use(morgan('combined'));

app.use((req, res, next) => {
    console.log('모든 요청에 실행');
    next();
}, (res, req, next) => {
    try{
        //ㄴㄴconsole.log(asdfasdfsa);
    }catch(error){
        next(error);
    }
});

app.set('port', process.env.PORT || 3000);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
    if(true){
        next('route');
    }else{
        next();
    };
}, (req, res, next) =>{
    console.log('실행');
});

app.post('/', (req, res) => {
    res.send('hello express');
});

app.get('/category/javascript', (req, res) => {
    res.send('hello javascript');
});

app.get('/category/:name', (res, req) => {
    res.send('hello wildcard');
});

app.get('*', (res, req) => {
    res.send('hello everybody');
});

app.get('/about', (req, res) => {
    res.send('hello express');
});

app.use((req, res, next) => {
    res.status(200).send('404');
})
//에러미들웨어 4가지 매개변수가 꼭 있어야한다
app.use((err, req, res, next) => {
    console.error(err);
    res.send('에러')
})

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행');
});
