const mongoose = require('mongoose');

const usageDataSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    period: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        default: 'daily'
    },
    downloadUsage: {
        type: Number, // in GB
        required: true,
        default: 0
    },
    uploadUsage: {
        type: Number, // in GB
        required: true,
        default: 0
    },
    totalUsage: {
        type: Number, // in GB
        required: true,
        default: 0
    },
    peakSpeed: {
        download: { type: Number, default: 0 }, // Mbps
        upload: { type: Number, default: 0 }    // Mbps
    },
    averageSpeed: {
        download: { type: Number, default: 0 }, // Mbps
        upload: { type: Number, default: 0 }    // Mbps
    },
    deviceCount: {
        type: Number,
        default: 1
    },
    activeHours: {
        type: Number, // hours of usage in the day
        default: 0
    },
    usagePatterns: {
        morningUsage: { type: Number, default: 0 }, // 6AM-12PM
        afternoonUsage: { type: Number, default: 0 }, // 12PM-6PM
        eveningUsage: { type: Number, default: 0 }, // 6PM-12AM
        nightUsage: { type: Number, default: 0 }    // 12AM-6AM
    },
    applicationUsage: [{
        category: {
            type: String,
            enum: ['streaming', 'gaming', 'browsing', 'work', 'social', 'other']
        },
        usage: Number, // in GB
        percentage: Number
    }],
    qualityMetrics: {
        latency: { type: Number, default: 0 }, // ms
        jitter: { type: Number, default: 0 },  // ms
        packetLoss: { type: Number, default: 0 }, // percentage
        uptime: { type: Number, default: 100 } // percentage
    },
    locationData: {
        city: String,
        state: String,
        country: String,
        timezone: String
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

// Indexes for better query performance
usageDataSchema.index({ userId: 1, date: -1 });
usageDataSchema.index({ subscriptionId: 1, date: -1 });
usageDataSchema.index({ date: -1 });

// Update timestamp on save
usageDataSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    // Calculate total usage
    this.totalUsage = this.downloadUsage + this.uploadUsage;
    next();
});

// Static method to get user's average usage
usageDataSchema.statics.getUserAverageUsage = function(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return this.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId),
                date: { $gte: startDate }
            }
        },
        {
            $group: {
                _id: null,
                avgDownload: { $avg: '$downloadUsage' },
                avgUpload: { $avg: '$uploadUsage' },
                avgTotal: { $avg: '$totalUsage' },
                avgDeviceCount: { $avg: '$deviceCount' },
                avgActiveHours: { $avg: '$activeHours' },
                peakDownload: { $max: '$peakSpeed.download' },
                peakUpload: { $max: '$peakSpeed.upload' }
            }
        }
    ]);
};

// Static method to get usage trends
usageDataSchema.statics.getUsageTrends = function(userId, period = 'monthly') {
    const groupBy = period === 'daily' ? 
        { $dateToString: { format: "%Y-%m-%d", date: "$date" } } :
        period === 'weekly' ? 
        { $dateToString: { format: "%Y-W%U", date: "$date" } } :
        { $dateToString: { format: "%Y-%m", date: "$date" } };
    
    return this.aggregate([
        {
            $match: { userId: new mongoose.Types.ObjectId(userId) }
        },
        {
            $group: {
                _id: groupBy,
                totalUsage: { $sum: '$totalUsage' },
                avgSpeed: { $avg: '$averageSpeed.download' },
                deviceCount: { $avg: '$deviceCount' }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);
};

// Method to analyze usage for AI recommendations
usageDataSchema.methods.getAIAnalysisData = function() {
    return {
        averageDownload: this.averageSpeed.download,
        averageUpload: this.averageSpeed.upload,
        peakUsage: Math.max(this.peakSpeed.download, this.peakSpeed.upload),
        deviceCount: this.deviceCount,
        totalUsage: this.totalUsage,
        usagePatterns: this.usagePatterns,
        qualityMetrics: this.qualityMetrics,
        activeHours: this.activeHours
    };
};

module.exports = mongoose.model('UsageData', usageDataSchema);
