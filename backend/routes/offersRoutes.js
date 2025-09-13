const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
    getActiveOffers,
    getOfferById,
    applyOffer,
    createOffer,
    updateOffer,
    deleteOffer
} = require('../controllers/offersController');

// Public routes
router.get('/', getActiveOffers);
router.get('/:offerId', getOfferById);

// Protected routes (require authentication)
router.post('/apply', authenticateToken, applyOffer);

// Admin routes
router.post('/admin/create', authenticateToken, createOffer);
router.put('/admin/:offerId', authenticateToken, updateOffer);
router.delete('/admin/:offerId', authenticateToken, deleteOffer);

module.exports = router;
