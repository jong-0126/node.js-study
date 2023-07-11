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

app.get('/', (request, response) => {
    fs.readFile('192_bookList.html', 'utf-8', (error, data) => {
        connection.query('SELECT * from books', (error, results, fields) => {
            response.send(ejs.render(data, {
                data: results,
            }));
        });
    });
});

app.get('/delete/:id', (request, response) => {
    connection.query('DELETE FROM books where number = ?', [request.params.id], () => {
        response.redirect('/');
    });
});