const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    currentPlan: {
        type: String,
        default: 'basic'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'inactive'
    },
    preferences: {
        budget: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },
        priority: {
            type: String,
            enum: ['speed', 'price', 'reliability'],
            default: 'speed'
        },
        familySize: {
            type: Number,
            default: 1
        }
    },
    usageData: {
        averageDownload: {
            type: Number,
            default: 100
        },
        averageUpload: {
            type: Number,
            default: 20
        },
        peakUsage: {
            type: Number,
            default: 200
        },
        deviceCount: {
            type: Number,
            default: 3
        }
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
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

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Update timestamp on save
userSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Get user profile without sensitive data
userSchema.methods.toProfile = function() {
    return {
        id: this._id,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        phone: this.phone,
        address: this.address,
        currentPlan: this.currentPlan,
        subscriptionStatus: this.subscriptionStatus,
        preferences: this.preferences,
        usageData: this.usageData,
        isActive: this.isActive,
        lastLogin: this.lastLogin,
        createdAt: this.createdAt
    };
};

module.exports = mongoose.model('User', userSchema);
