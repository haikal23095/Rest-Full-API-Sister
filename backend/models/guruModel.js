const db = require('../config/database');

const GuruModel = {
    getAll: async () => {
        // Left Join karena mungkin ada guru yang bukan wali kelas
        const query = `
            SELECT g.*, k.nama_kelas 
            FROM guru g 
            LEFT JOIN kelas k ON g.kelas_id = k.kelas_id
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    getById: async (id) => {
        const query = `
            SELECT g.*, k.nama_kelas 
            FROM guru g 
            LEFT JOIN kelas k ON g.kelas_id = k.kelas_id
            WHERE g.guru_id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nama_guru, nip, subject, kelas_id } = data;
        const [result] = await db.query(
            'INSERT INTO guru (nama_guru, nip, subject, kelas_id) VALUES (?, ?, ?, ?)',
            [nama_guru, nip, subject, kelas_id]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { nama_guru, nip, subject, kelas_id } = data;
        const [result] = await db.query(
            'UPDATE guru SET nama_guru=?, nip=?, subject=?, kelas_id=? WHERE guru_id=?',
            [nama_guru, nip, subject, kelas_id, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM guru WHERE guru_id = ?', [id]);
        return result.affectedRows;
    }
};
module.exports = GuruModel;