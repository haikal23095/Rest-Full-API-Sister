const mysql = require('mysql2');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sekolah_db'
};

const pool = mysql.createPool(dbConfig);

// Kita bungkus pool.query supaya support Promise (async/await) lebih enak
const db = pool.promise();

module.exports = db;