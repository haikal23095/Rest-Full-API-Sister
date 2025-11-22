const JadwalModel = require('../models/jadwalModel');

// GET All
exports.index = async (req, res) => {
    try {
        const jadwal = await JadwalModel.getAll();
        res.json(jadwal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET One by ID
exports.show = async (req, res) => {
    try {
        const jadwal = await JadwalModel.getById(req.params.id);
        if (!jadwal) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
        }
        res.json(jadwal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST (Create)
exports.store = async (req, res) => {
    try {
        const { hari, waktu, kelas_id, guru_id } = req.body;
        
        // Validasi sederhana
        if (!hari || !waktu || !kelas_id || !guru_id) {
            return res.status(400).json({ message: 'Semua field (hari, waktu, kelas_id, guru_id) wajib diisi!' });
        }

        const newId = await JadwalModel.create(req.body);
        res.status(201).json({ 
            message: 'Jadwal berhasil ditambahkan', 
            data: { id: newId, ...req.body } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// PUT (Update)
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { hari, waktu, kelas_id, guru_id } = req.body;

        const affectedRows = await JadwalModel.update(id, req.body);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan atau tidak ada perubahan' });
        }

        res.json({ message: 'Jadwal berhasil diperbarui' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE
exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await JadwalModel.delete(id);

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
        }

        res.json({ message: 'Jadwal berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};