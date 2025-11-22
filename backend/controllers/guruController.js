const GuruModel = require('../models/guruModel');

exports.index = async (req, res) => {
    try { res.json(await GuruModel.getAll()); }
    catch (e) { res.status(500).json({ error: e.message }); }
};
exports.show = async (req, res) => {
    try {
        const data = await GuruModel.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ message: 'Data tidak ditemukan' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.store = async (req, res) => {
    try {
        const id = await GuruModel.create(req.body);
        res.status(201).json({ message: 'Guru ditambahkan', id });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update = async (req, res) => {
    try {
        const affected = await GuruModel.update(req.params.id, req.body);
        affected ? res.json({ message: 'Data Guru diupdate' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.destroy = async (req, res) => {
    try {
        const affected = await GuruModel.delete(req.params.id);
        affected ? res.json({ message: 'Guru dihapus' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};