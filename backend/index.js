const express = require('express');
const cors = require('cors');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
const PORT = 3000;

// Middleware Global
app.use(cors());
app.use(express.json());

// Routing
app.get('/', (req, res) => res.send('Backend Server Sister-Project (MVC Version) Running!'));

// Grouping Routes
app.use('/auth', authRoutes); // Akses: /auth/login, /auth/register
app.use('/api', apiRoutes);   // Akses: /api/dashboard-stats

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server Backend berjalan di port ${PORT}`);
});