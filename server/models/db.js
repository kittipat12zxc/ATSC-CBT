import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'dev',
  password: '123456',
  database: 'computer_base_testing',
});

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
  } else {
    console.log('✅ MySQL connected!');
  }
});

export default db;