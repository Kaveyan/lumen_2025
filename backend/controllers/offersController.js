const Offer = require('../models/Offer');

// Get all active offers
const getActiveOffers = async (req, res) => {
    try {
        const currentDate = new Date();
        const offers = await Offer.find({
            isActive: true,
            validUntil: { $gte: currentDate }
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            offers
        });
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch offers',
            error: error.message
        });
    }
};

// Get offer by ID
const getOfferById = async (req, res) => {
    try {
        const { offerId } = req.params;
        const offer = await Offer.findById(offerId);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.json({
            success: true,
            offer
        });
    } catch (error) {
        console.error('Error fetching offer:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch offer',
            error: error.message
        });
    }
};

// Apply offer to user subscription (for future use)
const applyOffer = async (req, res) => {
    try {
        const { offerId, planId } = req.body;
        const userId = req.user.id;

        const offer = await Offer.findById(offerId);
        if (!offer || !offer.isActive || new Date() > offer.validUntil) {
            return res.status(400).json({
                success: false,
                message: 'Offer is not valid or has expired'
            });
        }

        // Check if user is eligible for this offer
        if (offer.eligibility && offer.eligibility.length > 0) {
            // Add eligibility logic here (e.g., new customers only)
        }

        res.json({
            success: true,
            message: 'Offer applied successfully',
            offer,
            discountAmount: offer.discountAmount,
            discountPercentage: offer.discountPercentage
        });
    } catch (error) {
        console.error('Error applying offer:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to apply offer',
            error: error.message
        });
    }
};

// Admin: Create new offer
const createOffer = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const offerData = req.body;
        const offer = new Offer(offerData);
        await offer.save();

        res.status(201).json({
            success: true,
            message: 'Offer created successfully',
            offer
        });
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create offer',
            error: error.message
        });
    }
};

// Admin: Update offer
const updateOffer = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const { offerId } = req.params;
        const updateData = req.body;

        const offer = await Offer.findByIdAndUpdate(offerId, updateData, { new: true });
        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.json({
            success: true,
            message: 'Offer updated successfully',
            offer
        });
    } catch (error) {
        console.error('Error updating offer:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update offer',
            error: error.message
        });
    }
};

// Admin: Delete offer
const deleteOffer = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const { offerId } = req.params;
        const offer = await Offer.findByIdAndDelete(offerId);

        if (!offer) {
            return res.status(404).json({
                success: false,
                message: 'Offer not found'
            });
        }

        res.json({
            success: true,
            message: 'Offer deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting offer:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete offer',
            error: error.message
        });
    }
};

module.exports = {
    getActiveOffers,
    getOfferById,
    applyOffer,
    createOffer,
    updateOffer,
    deleteOffer
};
