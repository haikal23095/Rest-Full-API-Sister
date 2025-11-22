const MuridModel = require('../models/muridModel');

exports.index = async (req, res) => {
    try { res.json(await MuridModel.getAll()); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.show = async (req, res) => {
    try {
        const data = await MuridModel.getById(req.params.id);
        data ? res.json(data) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.store = async (req, res) => {
    try {
        const id = await MuridModel.create(req.body);
        res.status(201).json({ message: 'Murid ditambahkan', id });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.update = async (req, res) => {
    try {
        const affected = await MuridModel.update(req.params.id, req.body);
        affected ? res.json({ message: 'Data murid diupdate' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.destroy = async (req, res) => {
    try {
        const affected = await MuridModel.delete(req.params.id);
        affected ? res.json({ message: 'Murid dihapus' }) : res.status(404).json({ message: 'Not found' });
    } catch (e) { res.status(500).json({ error: e.message }); }
};