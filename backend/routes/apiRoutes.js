const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const jadwalController = require('../controllers/jadwalController');

const verifyToken = require('../middlewares/authMiddleware');
const { onlyAdmin } = require('../middlewares/roleMiddleware');

// Semua route di sini diproteksi oleh verifyToken
router.get('/dashboard-stats', verifyToken, dashboardController.getStats);

// --- JADWAL PELAJARAN (CRUD) ---
// 1. READ (Semua user login boleh melihat jadwal)
router.get('/jadwal', verifyToken, jadwalController.index);
router.get('/jadwal/:id', verifyToken, jadwalController.show);

// 2. CREATE, UPDATE, DELETE (HANYA ADMIN / ROLE 1)
// Urutannya: Cek Token dulu -> Baru Cek Role -> Baru masuk Controller
router.post('/jadwal', verifyToken, onlyAdmin, jadwalController.store);
router.put('/jadwal/:id', verifyToken, onlyAdmin, jadwalController.update);
router.delete('/jadwal/:id', verifyToken, onlyAdmin, jadwalController.destroy);

module.exports = router;