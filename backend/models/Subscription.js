const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    planId: {
        type: String,
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    planType: {
        type: String,
        enum: ['fiber', 'copper', 'business'],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    downloadSpeed: {
        type: Number,
        required: true
    },
    uploadSpeed: {
        type: Number,
        required: true
    },
    dataLimit: {
        type: String,
        default: 'Unlimited'
    },
    features: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'cancelled'],
        default: 'active'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date
    },
    nextBillingDate: {
        type: Date,
        required: true
    },
    billingCycle: {
        type: String,
        enum: ['monthly', 'quarterly', 'yearly'],
        default: 'monthly'
    },
    autoRenew: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
subscriptionSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Calculate next billing date
subscriptionSchema.methods.calculateNextBilling = function() {
    const currentDate = new Date();
    switch (this.billingCycle) {
        case 'monthly':
            return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
        case 'quarterly':
            return new Date(currentDate.setMonth(currentDate.getMonth() + 3));
        case 'yearly':
            return new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
        default:
            return new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    }
};

module.exports = mongoose.model('Subscription', subscriptionSchema);
