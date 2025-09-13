const User = require('../models/User');
const Subscription = require('../models/Subscription');
const PaymentHistory = require('../models/PaymentHistory');

// Get dashboard analytics
const getDashboardAnalytics = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        // Get current date for calculations
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Total users
        const totalUsers = await User.countDocuments();

        // Active subscriptions
        const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });

        // Monthly revenue (current month)
        const monthlyRevenue = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: startOfMonth },
                    paymentStatus: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // Last month revenue for comparison
        const lastMonthRevenue = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: startOfLastMonth, $lte: endOfLastMonth },
                    paymentStatus: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // Calculate churn rate
        const cancelledThisMonth = await Subscription.countDocuments({
            status: 'cancelled',
            endDate: { $gte: startOfMonth }
        });

        const churnRate = activeSubscriptions > 0 ? 
            ((cancelledThisMonth / (activeSubscriptions + cancelledThisMonth)) * 100).toFixed(1) : 0;

        // Revenue by month (last 6 months)
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        const revenueByMonth = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: sixMonthsAgo },
                    paymentStatus: 'completed'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$paidDate' },
                        month: { $month: '$paidDate' }
                    },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        // Format revenue by month data for frontend charts
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formattedRevenueByMonth = revenueByMonth.map(item => ({
            month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
            revenue: item.revenue,
            count: item.count
        }));

        // Subscription distribution by plan
        const subscriptionsByPlan = await Subscription.aggregate([
            {
                $match: { status: 'active' }
            },
            {
                $group: {
                    _id: '$planType',
                    count: { $sum: 1 },
                    revenue: { $sum: '$price' }
                }
            }
        ]);

        // Format subscription distribution data with proper plan names
        const planTypeMapping = {
            'fiber': 'Fiber',
            'cable': 'Cable', 
            'dsl': 'DSL',
            'satellite': 'Satellite'
        };
        
        const formattedSubscriptionsByPlan = subscriptionsByPlan.map(item => ({
            name: planTypeMapping[item._id] || item._id || 'Unknown',
            count: item.count,
            revenue: item.revenue
        }));

        // Recent activity (last 10 payments)
        const recentActivity = await PaymentHistory.find({
            paymentStatus: 'completed'
        })
        .populate('userId', 'name email')
        .sort({ paidDate: -1 })
        .limit(10)
        .select('amount paymentType description paidDate userId');

        const currentMonthRevenue = monthlyRevenue.length > 0 ? monthlyRevenue[0].total : 0;
        const previousMonthRevenue = lastMonthRevenue.length > 0 ? lastMonthRevenue[0].total : 0;

        res.json({
            success: true,
            analytics: {
                totalUsers,
                activeSubscriptions,
                monthlyRevenue: currentMonthRevenue,
                churnRate: parseFloat(churnRate),
                revenueGrowth: previousMonthRevenue > 0 ? 
                    (((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1) : 0,
                revenueByMonth: formattedRevenueByMonth,
                subscriptionsByPlan: formattedSubscriptionsByPlan,
                recentActivity
            }
        });

    } catch (error) {
        console.error('Error fetching dashboard analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch analytics',
            error: error.message
        });
    }
};

// Get user management data
const getUserManagement = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get users with their current subscriptions
        const users = await User.find()
            .select('name email role subscriptionStatus currentPlan createdAt')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get subscription details for each user
        const usersWithSubscriptions = await Promise.all(
            users.map(async (user) => {
                const subscription = await Subscription.findOne({
                    userId: user._id,
                    status: 'active'
                }).select('planName price billingCycle');

                return {
                    ...user.toObject(),
                    subscription
                };
            })
        );

        const totalUsers = await User.countDocuments();

        res.json({
            success: true,
            users: usersWithSubscriptions,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                hasNext: page < Math.ceil(totalUsers / limit),
                hasPrev: page > 1
            }
        });

    } catch (error) {
        console.error('Error fetching user management data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user data',
            error: error.message
        });
    }
};

// Get revenue analytics
const getRevenueAnalytics = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        const { period = '6months' } = req.query;
        const now = new Date();
        let startDate;

        switch (period) {
            case '1month':
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                break;
            case '3months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
                break;
            case '6months':
                startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
                break;
            case '1year':
                startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
                break;
            default:
                startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        }

        // Revenue over time
        const revenueOverTime = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: startDate },
                    paymentStatus: 'completed'
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$paidDate' },
                        month: { $month: '$paidDate' },
                        day: { $dayOfMonth: '$paidDate' }
                    },
                    revenue: { $sum: '$amount' },
                    transactions: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
            }
        ]);

        // Revenue by plan type
        const revenueByPlan = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: startDate },
                    paymentStatus: 'completed'
                }
            },
            {
                $lookup: {
                    from: 'subscriptions',
                    localField: 'subscriptionId',
                    foreignField: '_id',
                    as: 'subscription'
                }
            },
            {
                $unwind: '$subscription'
            },
            {
                $group: {
                    _id: '$subscription.planType',
                    revenue: { $sum: '$amount' },
                    transactions: { $sum: 1 }
                }
            }
        ]);

        // Total metrics
        const totalRevenue = await PaymentHistory.aggregate([
            {
                $match: {
                    paidDate: { $gte: startDate },
                    paymentStatus: 'completed'
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                    avgTransaction: { $avg: '$amount' }
                }
            }
        ]);

        res.json({
            success: true,
            analytics: {
                period,
                totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
                totalTransactions: totalRevenue.length > 0 ? totalRevenue[0].count : 0,
                avgTransactionValue: totalRevenue.length > 0 ? totalRevenue[0].avgTransaction : 0,
                revenueOverTime,
                revenueByPlan
            }
        });

    } catch (error) {
        console.error('Error fetching revenue analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch revenue analytics',
            error: error.message
        });
    }
};

// Get payment history
const getPaymentHistory = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required'
            });
        }

        // Get all payment history with user details
        const payments = await PaymentHistory.find({})
            .populate('userId', 'firstName lastName email')
            .sort({ paymentDate: -1 })
            .limit(50);

        res.json({
            success: true,
            payments
        });
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    getDashboardAnalytics,
    getUserManagement,
    getRevenueAnalytics,
    getPaymentHistory
};
