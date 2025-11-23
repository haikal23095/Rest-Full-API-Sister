const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');
const db = require('../config/database'); // Kita butuh ini untuk get all users

exports.index = async (req, res) => {
    try {
        // Ambil semua user tapi JANGAN tampilkan passwordnya
        const [users] = await db.query('SELECT id_user, username, role FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fungsi Create User (Bisa atur Role 1 atau 2)
exports.store = async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).json({ message: 'Username, Password, dan Role wajib diisi!' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Disini kita ijinkan input role (1 atau 2) karena yang akses adalah Admin
        const userId = await UserModel.create(username, hashedPassword, role);

        res.status(201).json({ message: 'User baru berhasil dibuat oleh Admin', userId });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username sudah terdaftar!' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.destroy = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id_user = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

        res.json({ message: 'User berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};