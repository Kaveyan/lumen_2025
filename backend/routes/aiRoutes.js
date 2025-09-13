const express = require('express');
const AIController = require('../controllers/aiController');

const router = express.Router();
const aiController = new AIController();

// Health check endpoint
router.get('/health', (req, res) => aiController.healthCheck(req, res));

// User recommendation endpoints
router.post('/recommendations', (req, res) => aiController.getRecommendations(req, res));
router.post('/users/:userId/recommendations', (req, res) => aiController.getRecommendations(req, res));
router.post('/users/:userId/churn-prediction', (req, res) => aiController.predictChurn(req, res));
router.post('/users/:userId/notifications', (req, res) => aiController.generateNotifications(req, res));

// Admin analytics endpoints
router.post('/admin/insights', (req, res) => aiController.getAdminInsights(req, res));
router.post('/admin/pricing-optimization', (req, res) => aiController.optimizePricing(req, res));

// Batch processing endpoint
router.post('/batch', (req, res) => aiController.batchProcess(req, res));

module.exports = router;
