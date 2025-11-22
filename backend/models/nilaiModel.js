const db = require('../config/database');

const NilaiModel = {
    getAll: async () => {
        const query = `
            SELECT n.*, m.nama_murid, m.nis, g.nama_guru 
            FROM nilai n 
            JOIN murid m ON n.murid_id = m.murid_id
            JOIN guru g ON n.guru_id = g.guru_id
        `;
        const [rows] = await db.query(query);
        return rows;
    },
    getById: async (id) => {
        const query = `
            SELECT n.*, m.nama_murid, m.nis, g.nama_guru 
            FROM nilai n 
            JOIN murid m ON n.murid_id = m.murid_id
            JOIN guru g ON n.guru_id = g.guru_id
            WHERE n.nilai_id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },
    create: async (data) => {
        const { murid_id, subject, nilai, guru_id } = data;
        const [result] = await db.query(
            'INSERT INTO nilai (murid_id, subject, nilai, guru_id) VALUES (?, ?, ?, ?)',
            [murid_id, subject, nilai, guru_id]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { murid_id, subject, nilai, guru_id } = data;
        const [result] = await db.query(
            'UPDATE nilai SET murid_id=?, subject=?, nilai=?, guru_id=? WHERE nilai_id=?',
            [murid_id, subject, nilai, guru_id, id]
        );
        return result.affectedRows;
    },
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM nilai WHERE nilai_id = ?', [id]);
        return result.affectedRows;
    }
};
module.exports = NilaiModel;