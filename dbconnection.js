// npm install -g mysql --save
var mysql = require('mysql');

var connection = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'thomaspb',
   database: 'vendas'
});

module.exports = connection;