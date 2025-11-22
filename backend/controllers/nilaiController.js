const NilaiModel = require('../models/nilaiModel');

exports.index = async (req, res) => {
    try { res.json(await NilaiModel.getAll()); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.show = async (req, res) => {
    try {
        const data = await NilaiModel.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.store = async (req, res) => {
    try {
        const id = await NilaiModel.create(req.body);
        res.status(201).json({ message: 'Nilai ditambahkan', id });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update = async (req, res) => {
    try {
        const affected = await NilaiModel.update(req.params.id, req.body);
        affected ? res.json({ message: 'Nilai diupdate' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.destroy = async (req, res) => {
    try {
        const affected = await NilaiModel.delete(req.params.id);
        affected ? res.json({ message: 'Nilai dihapus' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};