const db = require('../config/database');

const MuridModel = {
    getAll: async () => {
        const query = `
            SELECT m.*, k.nama_kelas 
            FROM murid m 
            LEFT JOIN kelas k ON m.kelas_id = k.kelas_id
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    getById: async (id) => {
        const query = `
            SELECT m.*, k.nama_kelas 
            FROM murid m 
            LEFT JOIN kelas k ON m.kelas_id = k.kelas_id
            WHERE m.murid_id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nama_murid, nis, alamat, kelas_id } = data;
        const [result] = await db.query(
            'INSERT INTO murid (nama_murid, nis, alamat, kelas_id) VALUES (?, ?, ?, ?)',
            [nama_murid, nis, alamat, kelas_id]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { nama_murid, nis, alamat, kelas_id } = data;
        const [result] = await db.query(
            'UPDATE murid SET nama_murid=?, nis=?, alamat=?, kelas_id=? WHERE murid_id=?',
            [nama_murid, nis, alamat, kelas_id, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM murid WHERE murid_id = ?', [id]);
        return result.affectedRows;
    }
};
module.exports = MuridModel;