const db = require('../config/database');

exports.getStats = async (req, res) => {
    try {
        // Query langsung di sini atau pindahkan ke Model terpisah jika mau lebih strict
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM guru) as jumlah_guru,
                (SELECT COUNT(*) FROM kelas) as jumlah_kelas,
                (SELECT COUNT(*) FROM murid) as jumlah_murid
        `;
        const [rows] = await db.query(query);

        res.json({
            user_login: req.user.username,
            role: req.user.role,
            stats: rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};