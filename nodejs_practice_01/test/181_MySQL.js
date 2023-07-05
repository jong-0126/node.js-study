const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'comicbook',
    port: '3306',
});

connection.connect();

connection.query('update books set genre = \'action\' where number = 2 and name = \'Mygiant Nerd Boyfriend\';'
,(error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.query('update books set genre = \'romance\', writer = \'JI\' where number = 2 ' + 
' and name = \'Mygiant Nerd Boyfriend\';', (error, result, fields) => {
    if(error) throw error;
    console.log(result);
});

connection.end();