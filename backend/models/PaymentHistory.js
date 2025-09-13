const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'wallet', 'admin_update', 'admin_action', 'system'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded', 'cancelled'],
        default: 'pending'
    },
    paymentType: {
        type: String,
        enum: ['subscription', 'upgrade', 'downgrade', 'one_time', 'recurring_monthly', 'recurring_yearly'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    planDetails: {
        planName: String,
        planType: String,
        billingCycle: String
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    paidDate: {
        type: Date
    },
    failureReason: {
        type: String
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    refundDate: {
        type: Date
    },
    invoiceNumber: {
        type: String,
        unique: true
    },
    metadata: {
        gateway: String,
        gatewayTransactionId: String,
        ipAddress: String,
        userAgent: String
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
paymentHistorySchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Generate invoice number
paymentHistorySchema.pre('save', function(next) {
    if (!this.invoiceNumber) {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.invoiceNumber = `INV-${timestamp.slice(-6)}-${random}`;
    }
    next();
});

// Mark payment as completed
paymentHistorySchema.methods.markCompleted = function() {
    this.paymentStatus = 'completed';
    this.paidDate = new Date();
    return this.save();
};

// Mark payment as failed
paymentHistorySchema.methods.markFailed = function(reason) {
    this.paymentStatus = 'failed';
    this.failureReason = reason;
    return this.save();
};

// Process refund
paymentHistorySchema.methods.processRefund = function(amount, reason) {
    this.paymentStatus = 'refunded';
    this.refundAmount = amount || this.amount;
    this.refundDate = new Date();
    this.failureReason = reason;
    return this.save();
};

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);
