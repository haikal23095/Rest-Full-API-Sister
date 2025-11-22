// Middleware untuk memastikan hanya ADMIN (Role 1) yang boleh lewat
const onlyAdmin = (req, res, next) => {
    // req.user ini didapat dari verifyToken sebelumnya
    if (!req.user) {
        return res.status(403).json({ message: 'Akses ditolak! User tidak dikenali.' });
    }

    // Cek apakah role-nya '1' (Admin)
    if (req.user.role !== '1') {
        return res.status(403).json({
            message: 'Akses Terlarang! Anda bukan Admin, anda tidak punya hak akses ini.'
        });
    }

    // Jika Admin, silakan lanjut
    next();
};

module.exports = { onlyAdmin };