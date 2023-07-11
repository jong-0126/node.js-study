const mysql = require('mysql');
const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '1234',
    database: 'comicbook',
    port: '3306',
});

const app = express();
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.listen(3000, () => {
    console.log('3000!');
    connection.connect();
});

app.get('/',(request, response) => {
    fs.readFile('192_bookList.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from books', (error, results, fields) => {
            if (error) throw error;
            response.send(ejs.render(data, {
                data: results,
            }));
        });
    });
});

app.get('/create', (request, response) => {
    fs.readFile('193_insertNewBook.html', 'utf-8', (error, data) => {
        if(error) throw error;
        response.send(data);
    });
});

app.post('/create', (request, response) => { // 변경: app.get('/create')을 app.post('/create')로 변경했습니다.
    const body = request.body;
    connection.query('INSERT INTO books (genre, name, writer, releasedate) VALUE (?,?,?,?)', [body.genre, body.name, body.writer, body.releasedate], () => {
        response.redirect('/');
    });
});

app.get('/modify/:id', (request, response) => {
    fs.readFile('194_modify.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from books WHERE number =?', [request.params.id], (error, results) => {
            if(error) throw error;
            console.log(request.params.id);
            response.send(ejs.render(data, {
                data: results[0],
            }));
        });
    });
});

app.post('/modify/:id', (request, response) => {
    const body = request.body;
    connection.query('UPDATE books SET genre = ?, name = ?, writer = ? WHERE number = ?', [body.genre, body.name, body.writer, request.params.id], (error, results) => { // 변경: 쿼리에서 콤마를 제거했습니다.
        if(error) throw error;
        response.redirect('/');
    });
});
