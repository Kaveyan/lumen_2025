const express = require('express');
const SubscriptionController = require('../controllers/subscriptionController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const subscriptionController = new SubscriptionController();

// Public routes (no authentication required)
router.get('/plans', (req, res) => subscriptionController.getAvailablePlans(req, res));

// Protected routes (authentication required)
router.get('/current', authenticateToken, (req, res) => subscriptionController.getCurrentSubscription(req, res));
router.post('/subscribe', authenticateToken, (req, res) => subscriptionController.subscribeToNewPlan(req, res));
router.post('/upgrade', authenticateToken, (req, res) => subscriptionController.upgradeSubscription(req, res));
router.post('/downgrade', authenticateToken, (req, res) => subscriptionController.downgradeSubscription(req, res));

// Payment and billing routes
router.post('/cancel', authenticateToken, (req, res) => subscriptionController.cancelSubscription(req, res));
router.get('/payment-history', authenticateToken, (req, res) => subscriptionController.getPaymentHistory(req, res));
router.post('/usage', authenticateToken, (req, res) => subscriptionController.updateUsageData(req, res));
router.get('/analytics', authenticateToken, (req, res) => subscriptionController.getUsageAnalytics(req, res));

// Admin routes
router.post('/admin/update', authenticateToken, (req, res) => subscriptionController.adminUpdateUserSubscription(req, res));
router.post('/admin/cancel', authenticateToken, (req, res) => subscriptionController.adminCancelUserSubscription(req, res));

module.exports = router;
