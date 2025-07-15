const mysql = require('mysql2/promise');

async function getDB() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '2521',
        database: 'ATSC',
        port: 3306
    });
    return connection;
}
// ทดสอบ
module.exports = getDB;