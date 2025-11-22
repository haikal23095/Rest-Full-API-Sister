const KelasModel = require('../models/kelasModel');

exports.index = async (req, res) => {
    try { res.json(await KelasModel.getAll()); }
    catch (e) { res.status(500).json({ error: e.message }); }
};

exports.show = async (req, res) => {
    try {
        const data = await KelasModel.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ message: 'Kelas tidak ditemukan' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.store = async (req, res) => {
    try {
        const id = await KelasModel.create(req.body);
        res.status(201).json({ message: 'Kelas dibuat', id, ...req.body });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.update = async (req, res) => {
    try {
        const affected = await KelasModel.update(req.params.id, req.body);
        affected ? res.json({ message: 'Kelas diupdate' }) : res.status(404).json({ message: 'Gagal update' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};

exports.destroy = async (req, res) => {
    try {
        const affected = await KelasModel.delete(req.params.id);
        affected ? res.json({ message: 'Kelas dihapus' }) : res.status(404).json({ message: 'Gagal hapus' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};