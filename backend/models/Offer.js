const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed_amount', 'free_item'],
        required: true
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    discountAmount: {
        type: Number,
        min: 0,
        default: 0
    },
    freeItem: {
        type: String,
        default: null
    },
    badge: {
        type: String,
        required: true // e.g., "50% OFF", "FREE Router"
    },
    validFrom: {
        type: Date,
        default: Date.now
    },
    validUntil: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    eligibility: [{
        type: String,
        enum: ['new_customers', 'existing_customers', 'upgrade_only', 'all']
    }],
    applicablePlans: [{
        type: String // Plan IDs that this offer applies to
    }],
    maxUses: {
        type: Number,
        default: null // null means unlimited
    },
    currentUses: {
        type: Number,
        default: 0
    },
    terms: {
        type: String,
        default: ''
    },
    priority: {
        type: Number,
        default: 0 // Higher number = higher priority for display
    }
}, {
    timestamps: true
});

// Index for efficient queries
offerSchema.index({ isActive: 1, validUntil: 1 });
offerSchema.index({ validFrom: 1, validUntil: 1 });

// Virtual for checking if offer is currently valid
offerSchema.virtual('isCurrentlyValid').get(function() {
    const now = new Date();
    return this.isActive && 
           this.validFrom <= now && 
           this.validUntil >= now &&
           (this.maxUses === null || this.currentUses < this.maxUses);
});

module.exports = mongoose.model('Offer', offerSchema);
