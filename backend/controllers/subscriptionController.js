const User = require('../models/User');
const Subscription = require('../models/Subscription');
const PaymentHistory = require('../models/PaymentHistory');
const UsageData = require('../models/UsageData');

class SubscriptionController {
    // Get user's current subscription
    async getCurrentSubscription(req, res) {
        try {
            const userId = req.user.userId;
            
            const subscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            }).populate('userId', 'firstName lastName email');
            
            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found'
                });
            }

            res.json({
                success: true,
                subscription
            });
        } catch (error) {
            console.error('Get subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get subscription',
                error: error.message
            });
        }
    }

    // Subscribe to a new plan (for users without existing subscription)
    async subscribeToNewPlan(req, res) {
        try {
            const userId = req.user.userId;
            const { planId, billingCycle = 'monthly' } = req.body;

            // Check if user already has an active subscription
            const existingSubscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            if (existingSubscription) {
                return res.status(400).json({
                    success: false,
                    message: 'User already has an active subscription. Use upgrade/downgrade instead.'
                });
            }

            // Get available plans
            const plans = [
                { id: 'basic-fiber', name: 'Basic Fiber', type: 'fiber', price: 39.99, downloadSpeed: 100, uploadSpeed: 20, features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract'] },
                { id: 'premium-fiber', name: 'Premium Fiber', type: 'fiber', price: 59.99, downloadSpeed: 500, uploadSpeed: 100, features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract'] },
                { id: 'ultra-fiber', name: 'Ultra Fiber', type: 'fiber', price: 89.99, downloadSpeed: 1000, uploadSpeed: 500, features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract'] },
                { id: 'basic-copper', name: 'Basic Copper', type: 'copper', price: 29.99, downloadSpeed: 50, uploadSpeed: 10, features: ['500GB Data', 'Standard Installation', 'Basic Support', '2 Year Contract'] },
                { id: 'standard-copper', name: 'Standard Copper', type: 'copper', price: 39.99, downloadSpeed: 100, uploadSpeed: 15, features: ['Unlimited Data', 'Free Installation', 'Standard Support', '1 Year Contract'] },
                { id: 'business-fiber-pro', name: 'Business Fiber Pro', type: 'business', price: 149.99, downloadSpeed: 1000, uploadSpeed: 1000, features: ['Unlimited Data', 'Dedicated Support', 'SLA Guarantee', 'Static IP', 'No Contract'] }
            ];

            const selectedPlan = plans.find(p => p.id === planId);
            if (!selectedPlan) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid plan selected'
                });
            }

            // Create new subscription
            const nextBillingDate = new Date();
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

            const newSubscription = new Subscription({
                userId,
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                planType: selectedPlan.type,
                price: selectedPlan.price,
                downloadSpeed: selectedPlan.downloadSpeed,
                uploadSpeed: selectedPlan.uploadSpeed,
                features: selectedPlan.features,
                nextBillingDate,
                billingCycle,
                status: 'active',
                startDate: new Date(),
                autoRenew: true
            });

            await newSubscription.save();

            // Update user's current plan
            await User.findByIdAndUpdate(userId, {
                currentPlan: selectedPlan.id,
                subscriptionStatus: 'active'
            });

            // Create payment record
            const payment = new PaymentHistory({
                userId,
                subscriptionId: newSubscription._id,
                transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: selectedPlan.price,
                paymentMethod: 'credit_card',
                paymentStatus: 'completed',
                paymentType: 'subscription',
                description: `Subscribed to ${selectedPlan.name}`,
                planDetails: {
                    planName: selectedPlan.name,
                    planType: selectedPlan.type,
                    billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: `Successfully subscribed to ${selectedPlan.name}`,
                subscription: newSubscription,
                payment
            });
        } catch (error) {
            console.error('Subscribe to new plan error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to subscribe to plan',
                error: error.message
            });
        }
    }

    // Get available plans
    async getAvailablePlans(req, res) {
        try {
            const plans = [
                {
                    id: 'basic-fiber',
                    name: 'Basic Fiber',
                    type: 'fiber',
                    price: 39.99,
                    downloadSpeed: 100,
                    uploadSpeed: 20,
                    dataLimit: 'Unlimited',
                    features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract'],
                    popular: false,
                    description: 'Perfect for light internet users and small households'
                },
                {
                    id: 'premium-fiber',
                    name: 'Premium Fiber',
                    type: 'fiber',
                    price: 59.99,
                    downloadSpeed: 500,
                    uploadSpeed: 100,
                    dataLimit: 'Unlimited',
                    features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract'],
                    popular: true,
                    description: 'Great for streaming, gaming, and medium-sized families'
                },
                {
                    id: 'ultra-fiber',
                    name: 'Ultra Fiber',
                    type: 'fiber',
                    price: 89.99,
                    downloadSpeed: 1000,
                    uploadSpeed: 500,
                    dataLimit: 'Unlimited',
                    features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract'],
                    popular: false,
                    description: 'Maximum performance for power users and large households'
                },
                {
                    id: 'basic-copper',
                    name: 'Basic Copper',
                    type: 'copper',
                    price: 29.99,
                    downloadSpeed: 50,
                    uploadSpeed: 10,
                    dataLimit: '500GB',
                    features: ['500GB Data', 'Standard Installation', 'Basic Support', '2 Year Contract'],
                    popular: false,
                    description: 'Affordable option for basic internet needs'
                },
                {
                    id: 'standard-copper',
                    name: 'Standard Copper',
                    type: 'copper',
                    price: 39.99,
                    downloadSpeed: 100,
                    uploadSpeed: 15,
                    dataLimit: 'Unlimited',
                    features: ['Unlimited Data', 'Free Installation', 'Standard Support', '1 Year Contract'],
                    popular: false,
                    description: 'Reliable copper connection for everyday use'
                },
                {
                    id: 'business-fiber-pro',
                    name: 'Business Fiber Pro',
                    type: 'business',
                    price: 149.99,
                    downloadSpeed: 1000,
                    uploadSpeed: 1000,
                    dataLimit: 'Unlimited',
                    features: ['Unlimited Data', 'Dedicated Support', 'SLA Guarantee', 'Static IP', 'No Contract'],
                    popular: false,
                    description: 'Enterprise-grade connectivity for businesses'
                }
            ];

            res.json({
                success: true,
                plans
            });
        } catch (error) {
            console.error('Get plans error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get plans',
                error: error.message
            });
        }
    }

    // Upgrade subscription
    async upgradeSubscription(req, res) {
        try {
            const userId = req.user.userId;
            const { newPlanId, billingCycle = 'monthly' } = req.body;

            // Get available plans (matching frontend plan IDs)
            const plans = [
                { id: 'basic-fiber', name: 'Basic Fiber', type: 'fiber', price: 39.99, downloadSpeed: 100, uploadSpeed: 20, features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract'] },
                { id: 'premium-fiber', name: 'Premium Fiber', type: 'fiber', price: 59.99, downloadSpeed: 500, uploadSpeed: 100, features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract'] },
                { id: 'ultra-fiber', name: 'Ultra Fiber', type: 'fiber', price: 89.99, downloadSpeed: 1000, uploadSpeed: 500, features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract'] },
                { id: 'basic-copper', name: 'Basic Copper', type: 'copper', price: 29.99, downloadSpeed: 50, uploadSpeed: 10, features: ['500GB Data', 'Standard Installation', 'Basic Support', '2 Year Contract'] },
                { id: 'standard-copper', name: 'Standard Copper', type: 'copper', price: 39.99, downloadSpeed: 100, uploadSpeed: 15, features: ['Unlimited Data', 'Free Installation', 'Standard Support', '1 Year Contract'] },
                { id: 'business-fiber-pro', name: 'Business Fiber Pro', type: 'business', price: 149.99, downloadSpeed: 1000, uploadSpeed: 1000, features: ['Unlimited Data', 'Dedicated Support', 'SLA Guarantee', 'Static IP', 'No Contract'] }
            ];

            const newPlan = plans.find(p => p.id === newPlanId);
            if (!newPlan) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid plan selected'
                });
            }

            // Get current subscription
            const currentSubscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            // Create new subscription
            const nextBillingDate = new Date();
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

            const newSubscription = new Subscription({
                userId,
                planId: newPlan.id,
                planName: newPlan.name,
                planType: newPlan.type,
                price: newPlan.price,
                downloadSpeed: newPlan.downloadSpeed,
                uploadSpeed: newPlan.uploadSpeed,
                features: newPlan.features,
                nextBillingDate,
                billingCycle
            });

            await newSubscription.save();

            // Deactivate old subscription
            if (currentSubscription) {
                currentSubscription.status = 'inactive';
                await currentSubscription.save();
            }

            // Update user's current plan
            await User.findByIdAndUpdate(userId, {
                currentPlan: newPlan.id,
                subscriptionStatus: 'active'
            });

            // Create payment record
            const payment = new PaymentHistory({
                userId,
                subscriptionId: newSubscription._id,
                transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: newPlan.price,
                paymentMethod: 'credit_card',
                paymentStatus: 'completed',
                paymentType: currentSubscription ? 'upgrade' : 'subscription',
                description: `${currentSubscription ? 'Upgraded to' : 'Subscribed to'} ${newPlan.name}`,
                planDetails: {
                    planName: newPlan.name,
                    planType: newPlan.type,
                    billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: `Successfully ${currentSubscription ? 'upgraded to' : 'subscribed to'} ${newPlan.name}`,
                subscription: newSubscription,
                payment
            });
        } catch (error) {
            console.error('Upgrade subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to upgrade subscription',
                error: error.message
            });
        }
    }

    // Downgrade subscription
    async downgradeSubscription(req, res) {
        try {
            const userId = req.user.userId;
            const { newPlanId, billingCycle = 'monthly' } = req.body;

            const plans = [
                { id: 'basic-fiber', name: 'Basic Fiber', type: 'fiber', price: 39.99, downloadSpeed: 100, uploadSpeed: 20, features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract'] },
                { id: 'premium-fiber', name: 'Premium Fiber', type: 'fiber', price: 59.99, downloadSpeed: 500, uploadSpeed: 100, features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract'] },
                { id: 'ultra-fiber', name: 'Ultra Fiber', type: 'fiber', price: 89.99, downloadSpeed: 1000, uploadSpeed: 500, features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract'] },
                { id: 'basic-copper', name: 'Basic Copper', type: 'copper', price: 29.99, downloadSpeed: 50, uploadSpeed: 10, features: ['500GB Data', 'Standard Installation', 'Basic Support', '2 Year Contract'] },
                { id: 'standard-copper', name: 'Standard Copper', type: 'copper', price: 39.99, downloadSpeed: 100, uploadSpeed: 15, features: ['Unlimited Data', 'Free Installation', 'Standard Support', '1 Year Contract'] },
                { id: 'business-fiber-pro', name: 'Business Fiber Pro', type: 'business', price: 149.99, downloadSpeed: 1000, uploadSpeed: 1000, features: ['Unlimited Data', 'Dedicated Support', 'SLA Guarantee', 'Static IP', 'No Contract'] }
            ];

            const newPlan = plans.find(p => p.id === newPlanId);
            if (!newPlan) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid plan selected'
                });
            }

            // Get current subscription
            const currentSubscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            if (!currentSubscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found'
                });
            }

            // Create new subscription (effective next billing cycle)
            const newSubscription = new Subscription({
                userId,
                planId: newPlan.id,
                planName: newPlan.name,
                planType: newPlan.type,
                price: newPlan.price,
                downloadSpeed: newPlan.downloadSpeed,
                uploadSpeed: newPlan.uploadSpeed,
                features: newPlan.features,
                startDate: currentSubscription.nextBillingDate,
                nextBillingDate: new Date(currentSubscription.nextBillingDate.getTime() + (30 * 24 * 60 * 60 * 1000)),
                billingCycle,
                status: 'inactive' // Will be activated on next billing cycle
            });

            await newSubscription.save();

            // Update current subscription to end on next billing date
            currentSubscription.endDate = currentSubscription.nextBillingDate;
            await currentSubscription.save();

            // Create payment record for the downgrade
            const payment = new PaymentHistory({
                userId,
                subscriptionId: newSubscription._id,
                transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: 0, // No immediate charge for downgrade
                paymentMethod: 'system',
                paymentStatus: 'completed',
                paymentType: 'downgrade',
                description: `Scheduled downgrade to ${newPlan.name} (effective ${currentSubscription.nextBillingDate.toDateString()})`,
                planDetails: {
                    planName: newPlan.name,
                    planType: newPlan.type,
                    billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: `Successfully scheduled downgrade to ${newPlan.name}. Changes will take effect on ${currentSubscription.nextBillingDate.toDateString()}`,
                currentSubscription,
                newSubscription,
                payment
            });
        } catch (error) {
            console.error('Downgrade subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to downgrade subscription',
                error: error.message
            });
        }
    }

    // Cancel subscription
    async cancelSubscription(req, res) {
        try {
            const userId = req.user.userId;
            const { reason } = req.body;

            const subscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found'
                });
            }

            // Cancel at end of billing period
            subscription.status = 'cancelled';
            subscription.endDate = subscription.nextBillingDate;
            subscription.autoRenew = false;
            await subscription.save();

            // Update user status
            await User.findByIdAndUpdate(userId, {
                subscriptionStatus: 'inactive'
            });

            // Create cancellation record
            const payment = new PaymentHistory({
                userId,
                subscriptionId: subscription._id,
                transactionId: `CANCEL_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: 0,
                paymentMethod: 'system',
                paymentStatus: 'completed',
                paymentType: 'one_time',
                description: `Subscription cancelled - ${reason || 'No reason provided'}`,
                planDetails: {
                    planName: subscription.planName,
                    planType: subscription.planType,
                    billingCycle: subscription.billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: `Subscription cancelled. Service will continue until ${subscription.endDate.toDateString()}`,
                subscription,
                cancellationRecord: payment
            });
        } catch (error) {
            console.error('Cancel subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to cancel subscription',
                error: error.message
            });
        }
    }

    // Get payment history
    async getPaymentHistory(req, res) {
        try {
            const userId = req.user.userId;
            const { limit = 10, page = 1 } = req.query;

            const payments = await PaymentHistory.find({ userId })
                .populate('subscriptionId', 'planName planType')
                .sort({ createdAt: -1 })
                .limit(parseInt(limit))
                .skip((parseInt(page) - 1) * parseInt(limit));

            const total = await PaymentHistory.countDocuments({ userId });

            res.json({
                success: true,
                payments,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    pages: Math.ceil(total / parseInt(limit))
                }
            });
        } catch (error) {
            console.error('Get payment history error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get payment history',
                error: error.message
            });
        }
    }

    // Update usage data
    async updateUsageData(req, res) {
        try {
            const userId = req.user.userId;
            const {
                downloadUsage,
                uploadUsage,
                deviceCount,
                activeHours,
                usagePatterns,
                applicationUsage
            } = req.body;

            const subscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found'
                });
            }

            // Create or update today's usage data
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            let usageData = await UsageData.findOne({
                userId,
                subscriptionId: subscription._id,
                date: today
            });

            if (usageData) {
                // Update existing record
                usageData.downloadUsage = downloadUsage || usageData.downloadUsage;
                usageData.uploadUsage = uploadUsage || usageData.uploadUsage;
                usageData.deviceCount = deviceCount || usageData.deviceCount;
                usageData.activeHours = activeHours || usageData.activeHours;
                usageData.usagePatterns = usagePatterns || usageData.usagePatterns;
                usageData.applicationUsage = applicationUsage || usageData.applicationUsage;
            } else {
                // Create new record
                usageData = new UsageData({
                    userId,
                    subscriptionId: subscription._id,
                    date: today,
                    downloadUsage: downloadUsage || 0,
                    uploadUsage: uploadUsage || 0,
                    deviceCount: deviceCount || 1,
                    activeHours: activeHours || 0,
                    usagePatterns: usagePatterns || {},
                    applicationUsage: applicationUsage || []
                });
            }

            await usageData.save();

            // Update user's usage data for AI analysis
            const avgUsage = await UsageData.getUserAverageUsage(userId, 30);
            if (avgUsage.length > 0) {
                const avg = avgUsage[0];
                await User.findByIdAndUpdate(userId, {
                    'usageData.averageDownload': avg.avgDownload || 100,
                    'usageData.averageUpload': avg.avgUpload || 20,
                    'usageData.peakUsage': avg.peakDownload || 200,
                    'usageData.deviceCount': avg.avgDeviceCount || 3
                });
            }

            res.json({
                success: true,
                message: 'Usage data updated successfully',
                usageData
            });
        } catch (error) {
            console.error('Update usage data error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update usage data',
                error: error.message
            });
        }
    }

    // Get usage analytics
    async getUsageAnalytics(req, res) {
        try {
            const userId = req.user.userId;
            const { period = 'monthly', days = 30 } = req.query;

            // Get average usage
            const avgUsage = await UsageData.getUserAverageUsage(userId, parseInt(days));
            
            // Get usage trends
            const trends = await UsageData.getUsageTrends(userId, period);

            // Get recent usage data
            const recentUsage = await UsageData.find({ userId })
                .sort({ date: -1 })
                .limit(parseInt(days))
                .select('date downloadUsage uploadUsage totalUsage deviceCount activeHours');

            res.json({
                success: true,
                analytics: {
                    averageUsage: avgUsage[0] || {},
                    trends,
                    recentUsage
                }
            });
        } catch (error) {
            console.error('Get usage analytics error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to get usage analytics',
                error: error.message
            });
        }
    }

    // Admin: Update user subscription
    async adminUpdateUserSubscription(req, res) {
        try {
            console.log('Admin update subscription request:', req.body);
            const { userId, newPlanId, billingCycle = 'monthly' } = req.body;
            
            // Check if requester is admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Admin access required'
                });
            }

            // Validate userId
            if (!userId) {
                return res.status(400).json({
                    success: false,
                    message: 'User ID is required'
                });
            }

            // Check if user exists
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const plans = [
                { id: 'basic-fiber', name: 'Basic Fiber', type: 'fiber', price: 39.99, downloadSpeed: 100, uploadSpeed: 20 },
                { id: 'premium-fiber', name: 'Premium Fiber', type: 'fiber', price: 59.99, downloadSpeed: 500, uploadSpeed: 100 },
                { id: 'ultra-fiber', name: 'Ultra Fiber', type: 'fiber', price: 89.99, downloadSpeed: 1000, uploadSpeed: 500 },
                { id: 'basic-copper', name: 'Basic Copper', type: 'copper', price: 29.99, downloadSpeed: 50, uploadSpeed: 10 },
                { id: 'standard-copper', name: 'Standard Copper', type: 'copper', price: 39.99, downloadSpeed: 100, uploadSpeed: 15 },
                { id: 'business-fiber-pro', name: 'Business Fiber Pro', type: 'business', price: 149.99, downloadSpeed: 1000, uploadSpeed: 1000 }
            ];

            const newPlan = plans.find(p => p.id === newPlanId);
            if (!newPlan) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid plan selected'
                });
            }

            // Find current subscription
            const currentSubscription = await Subscription.findOne({ userId, status: 'active' });

            // Create new subscription
            const nextBillingDate = new Date();
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
            
            const newSubscription = new Subscription({
                userId,
                planId: newPlan.id,
                planName: newPlan.name,
                planType: newPlan.type,
                price: newPlan.price,
                billingCycle,
                downloadSpeed: newPlan.downloadSpeed,
                uploadSpeed: newPlan.uploadSpeed,
                features: ['Unlimited Data', 'Basic Support'],
                status: 'active',
                startDate: new Date(),
                nextBillingDate,
                autoRenew: true
            });

            await newSubscription.save();

            // Deactivate old subscription if exists
            if (currentSubscription) {
                currentSubscription.status = 'inactive';
                currentSubscription.endDate = new Date();
                await currentSubscription.save();
            }

            // Update user plan
            await User.findByIdAndUpdate(userId, {
                currentPlan: newPlan.id,
                subscriptionStatus: 'active'
            });

            // Create payment record
            const payment = new PaymentHistory({
                userId,
                subscriptionId: newSubscription._id,
                transactionId: `ADMIN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: newPlan.price,
                paymentMethod: 'admin_update',
                paymentStatus: 'completed',
                paymentType: billingCycle === 'yearly' ? 'recurring_yearly' : 'recurring_monthly',
                description: `Admin updated subscription to ${newPlan.name}`,
                planDetails: {
                    planName: newPlan.name,
                    planType: newPlan.type,
                    billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: `Successfully updated user subscription to ${newPlan.name}`,
                subscription: newSubscription,
                payment
            });
        } catch (error) {
            console.error('Admin update subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update user subscription',
                error: error.message
            });
        }
    }

    // Admin: Cancel user subscription
    async adminCancelUserSubscription(req, res) {
        try {
            const { userId } = req.body;
            
            // Check if requester is admin
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Admin access required'
                });
            }

            const subscription = await Subscription.findOne({ 
                userId, 
                status: 'active' 
            });

            if (!subscription) {
                return res.status(404).json({
                    success: false,
                    message: 'No active subscription found for this user'
                });
            }

            // Cancel subscription immediately
            subscription.status = 'cancelled';
            subscription.endDate = new Date();
            subscription.autoRenew = false;
            await subscription.save();

            // Update user status
            await User.findByIdAndUpdate(userId, {
                subscriptionStatus: 'inactive',
                currentPlan: null
            });

            // Create cancellation record
            const payment = new PaymentHistory({
                userId,
                subscriptionId: subscription._id,
                transactionId: `ADMIN_CANCEL_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                amount: 0,
                paymentMethod: 'admin_action',
                paymentStatus: 'completed',
                paymentType: 'one_time',
                description: 'Subscription cancelled by administrator',
                planDetails: {
                    planName: subscription.planName,
                    planType: subscription.planType,
                    billingCycle: subscription.billingCycle
                },
                paidDate: new Date()
            });

            await payment.save();

            res.json({
                success: true,
                message: 'User subscription cancelled successfully',
                subscription,
                cancellationRecord: payment
            });
        } catch (error) {
            console.error('Admin cancel subscription error:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to cancel user subscription',
                error: error.message
            });
        }
    }
}

module.exports = SubscriptionController;
