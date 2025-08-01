const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../config/database');
const path = require('path');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://chanu716.github.io',
    'https://chanu716.github.io/BlindHire',
    'http://localhost:5500', // for local dev
  ],
  credentials: true
}));
app.use(express.json());

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api', require('./routes'));

// Serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Database connection
mongoose.connect(config.database)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api`);
});