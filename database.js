const mysql = require('mysql2');

module.exports = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Psb0821',
        database: 'WebServerDB',
    }
);