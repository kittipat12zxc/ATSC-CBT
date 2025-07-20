const mysql = require('mysql2');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '2521',
  database: 'ATSC',
  port: 3306
});

module.exports = pool.promise(); // export promise pool
