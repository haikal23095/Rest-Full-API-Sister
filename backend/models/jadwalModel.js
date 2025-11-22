const db = require('../config/database');

const JadwalModel = {
    // 1. GET ALL (Ambil semua jadwal dengan detail nama kelas & guru)
    getAll: async () => {
        const query = `
            SELECT j.pelajaran_id, j.hari, j.waktu, 
                   k.nama_kelas, k.grade_level,
                   g.nama_guru, g.subject
            FROM jadwal_pelajaran j
            JOIN kelas k ON j.kelas_id = k.kelas_id
            JOIN guru g ON j.guru_id = g.guru_id
            ORDER BY j.hari, j.waktu ASC
        `;
        const [rows] = await db.query(query);
        return rows;
    },

    // 2. GET BY ID (Ambil 1 jadwal spesifik)
    getById: async (id) => {
        const query = `
            SELECT j.*, k.nama_kelas, g.nama_guru, g.subject 
            FROM jadwal_pelajaran j
            JOIN kelas k ON j.kelas_id = k.kelas_id
            JOIN guru g ON j.guru_id = g.guru_id
            WHERE j.pelajaran_id = ?
        `;
        const [rows] = await db.query(query, [id]);
        return rows[0];
    },

    // 3. CREATE (Tambah jadwal baru)
    create: async (data) => {
        const { hari, waktu, kelas_id, guru_id } = data;
        const query = 'INSERT INTO jadwal_pelajaran (hari, waktu, kelas_id, guru_id) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [hari, waktu, kelas_id, guru_id]);
        return result.insertId;
    },

    // 4. UPDATE (Edit jadwal)
    update: async (id, data) => {
        const { hari, waktu, kelas_id, guru_id } = data;
        const query = 'UPDATE jadwal_pelajaran SET hari=?, waktu=?, kelas_id=?, guru_id=? WHERE pelajaran_id=?';
        const [result] = await db.query(query, [hari, waktu, kelas_id, guru_id, id]);
        return result.affectedRows; // Mengembalikan jumlah baris yang berubah
    },

    // 5. DELETE (Hapus jadwal)
    delete: async (id) => {
        const query = 'DELETE FROM jadwal_pelajaran WHERE pelajaran_id = ?';
        const [result] = await db.query(query, [id]);
        return result.affectedRows;
    }
};

module.exports = JadwalModel;