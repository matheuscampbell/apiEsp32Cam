//realizar conexao com mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'facedetection_api'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are now connected with mysql database...');
});

module.exports = connection;