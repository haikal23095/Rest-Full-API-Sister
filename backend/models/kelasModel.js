const db = require('../config/database');

const KelasModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM kelas');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM kelas WHERE kelas_id = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nama_kelas, grade_level } = data;
        const [result] = await db.query('INSERT INTO kelas (nama_kelas, grade_level) VALUES (?, ?)', [nama_kelas, grade_level]);
        return result.insertId;
    },
    update: async (id, data) => {
        const { nama_kelas, grade_level } = data;
        const [result] = await db.query('UPDATE kelas SET nama_kelas=?, grade_level=? WHERE kelas_id=?', [nama_kelas, grade_level, id]);
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM kelas WHERE kelas_id = ?', [id]);
        return result.affectedRows;
    }
};
module.exports = KelasModel;