const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
    getDashboardAnalytics,
    getUserManagement,
    getRevenueAnalytics,
    getPaymentHistory
} = require('../controllers/adminController');

// All admin routes require authentication
router.use(authenticateToken);

// Dashboard analytics
router.get('/analytics/dashboard', getDashboardAnalytics);

// User management
router.get('/users', getUserManagement);

// Revenue analytics
router.get('/analytics/revenue', getRevenueAnalytics);

// Payment history
router.get('/payments', getPaymentHistory);

module.exports = router;
