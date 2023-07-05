const mysql = require('mysql');
const { error } = require('winston');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'comicbook',
    port: '3306',
});

connection.connect();

connection.query('select number, genre, name, writer, releasedate from books', 
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('select * from books where genre = \'action\'',
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('select * from books where genre = \'action\' or genre = \'comedy\'',
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('select * from books where releasedate LIKE \'2017%\'',
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('select number, genre, name, writer, releasedate from books order by releasedate;',
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('select number, genre, name, writer, releasedate from books order by releasedate desc;', 
(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.end();