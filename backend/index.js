const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Konfigurasi Database
// Mengambil nilai dari Environment Variable Docker
const dbConfig = {
    host: process.env.DB_HOST || 'localhost', // Nanti diisi 'node3_database' oleh Docker
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sekolah_db'
};

// Membuat Koneksi Pool (Lebih baik untuk production)
const pool = mysql.createPool(dbConfig);

// Cek koneksi saat start
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Gagal konek ke Database:', err.code);
        console.error('Pesan Error:', err.message);
    } else {
        console.log('✅ Berhasil terhubung ke Database MySQL!');
        connection.release();
    }
});

// --- REST API ROUTES ---

// 1. Test Route
app.get('/', (req, res) => {
    res.send('Halo dari Node 2 (Backend)! Sistem Terdistribusi siap.');
});

// 2. Get All Murid
app.get('/api/murid', (req, res) => {
    const query = 'SELECT * FROM murid';
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 3. Get Jadwal Pelajaran (Join Table Example)
app.get('/api/jadwal', (req, res) => {
    const query = `
        SELECT j.hari, j.waktu, k.nama_kelas, g.nama_guru 
        FROM jadwal_pelajaran j
        JOIN kelas k ON j.kelas_id = k.kelas_id
        JOIN guru g ON j.guru_id = g.guru_id
    `;
    pool.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Jalankan Server
app.listen(PORT, () => {
    console.log(`🚀 Server Backend berjalan di port ${PORT}`);
});