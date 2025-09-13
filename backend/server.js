const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ai', aiRoutes);

// Basic health check
app.get('/health', (req, res) => {
    res.json({
        status: 'Server is running',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'AI-Powered Subscription Management API',
        version: '1.0.0',
        endpoints: {
            health: '/health',
            ai: '/api/ai/*'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🤖 AI endpoints available at http://localhost:${PORT}/api/ai`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
