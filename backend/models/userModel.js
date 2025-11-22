const db = require('../config/database');

const UserModel = {
    // Cari user berdasarkan username
    findByUsername: async (username) => {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    // Buat user baru
    create: async (username, password, role) => {
        const [result] = await db.query(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, password, role]
        );
        return result.insertId;
    }
};

module.exports = UserModel;