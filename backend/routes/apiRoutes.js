const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const jadwalController = require('../controllers/jadwalController');
const kelasController = require('../controllers/kelasController');
const guruController = require('../controllers/guruController');
const muridController = require('../controllers/muridController');
const nilaiController = require('../controllers/nilaiController');
const userController = require('../controllers/userController');

const verifyToken = require('../middlewares/authMiddleware');
const { onlyAdmin } = require('../middlewares/roleMiddleware');

// Semua route di sini diproteksi oleh verifyToken
router.get('/dashboard-stats', verifyToken, dashboardController.getStats);

// ==========================================
// ROUTE: MANAJEMEN USER (KHUSUS ADMIN)
// ==========================================
// Ini endpoint untuk Admin membuat user baru (bisa bikin admin lain)
// atau melihat daftar user. User biasa (Role 2) DILARANG masuk sini.

// 1. Lihat daftar user
router.get('/users', verifyToken, onlyAdmin, userController.index);

// 2. Buat User Baru (Admin bisa set Role 1 atau 2 disini)
router.post('/users', verifyToken, onlyAdmin, userController.store);

// 3. Hapus User
router.delete('/users/:id', verifyToken, onlyAdmin, userController.destroy);


// ==========================================
// CRUD ROUTES (Helper Function biar kodingan rapi)
// ==========================================
// Fungsi ini otomatis bikin 5 route (List, Detail, Create, Update, Delete)
const registerCrudRoutes = (path, controller) => {
    // READ (Boleh User Biasa & Admin)
    router.get(path, verifyToken, controller.index);
    router.get(`${path}/:id`, verifyToken, controller.show);

    // CREATE, UPDATE, DELETE (Hanya Admin)
    router.post(path, verifyToken, onlyAdmin, controller.store);
    router.put(`${path}/:id`, verifyToken, onlyAdmin, controller.update);
    router.delete(`${path}/:id`, verifyToken, onlyAdmin, controller.destroy);
};

// ==========================================
// REGISTER SEMUA TABEL
// ==========================================

// 1. Jadwal Pelajaran
registerCrudRoutes('/jadwal', jadwalController);

// 2. Kelas
registerCrudRoutes('/kelas', kelasController);

// 3. Guru
registerCrudRoutes('/guru', guruController);

// 4. Murid
registerCrudRoutes('/murid', muridController);

// 5. Nilai
registerCrudRoutes('/nilai', nilaiController);

module.exports = router;