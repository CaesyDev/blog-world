const mysql = require('mysql');

const pool = mysql.createPool({
    
    host : 'localhost',
    user : "root",
    password : '',
    database : 'expresscrud'
});


module.exports = pool;