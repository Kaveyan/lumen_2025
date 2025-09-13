const mongoose = require('mongoose');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const PaymentHistory = require('../models/PaymentHistory');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kaveyan2025:kaveyan2025@cluster0.mongodb.net/lumen_broadband?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB connected for seeding analytics data');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

const seedAnalyticsData = async () => {
    try {
        console.log('Starting analytics data seeding...');

        // Create sample users if they don't exist
        const existingUsers = await User.find({});
        let users = existingUsers;

        if (existingUsers.length < 10) {
            const sampleUsers = [];
            for (let i = existingUsers.length; i < 10; i++) {
                sampleUsers.push({
                    name: `User ${i + 1}`,
                    email: `user${i + 1}@example.com`,
                    password: 'hashedpassword123',
                    phone: `555-000${i.toString().padStart(2, '0')}`,
                    address: `${100 + i} Main St, City, State`,
                    role: 'user',
                    currentPlan: ['basic-fiber', 'premium-fiber', 'ultra-fiber', 'basic-cable'][i % 4],
                    subscriptionStatus: Math.random() > 0.2 ? 'active' : 'inactive'
                });
            }
            
            const newUsers = await User.insertMany(sampleUsers);
            users = [...existingUsers, ...newUsers];
            console.log(`Created ${newUsers.length} sample users`);
        }

        // Create sample subscriptions
        await Subscription.deleteMany({}); // Clear existing subscriptions
        
        const plans = [
            { id: 'basic-fiber', name: 'Basic Fiber', type: 'fiber', price: 29.99, downloadSpeed: '100 Mbps', uploadSpeed: '50 Mbps' },
            { id: 'premium-fiber', name: 'Premium Fiber', type: 'fiber', price: 59.99, downloadSpeed: '500 Mbps', uploadSpeed: '250 Mbps' },
            { id: 'ultra-fiber', name: 'Ultra Fiber', type: 'fiber', price: 89.99, downloadSpeed: '1 Gbps', uploadSpeed: '500 Mbps' },
            { id: 'basic-cable', name: 'Basic Cable', type: 'cable', price: 39.99, downloadSpeed: '200 Mbps', uploadSpeed: '20 Mbps' }
        ];

        const subscriptions = [];
        users.forEach((user, index) => {
            const plan = plans[index % plans.length];
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - Math.floor(Math.random() * 12)); // Random start date within last year
            
            const nextBillingDate = new Date(startDate);
            nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

            subscriptions.push({
                userId: user._id,
                planId: plan.id,
                planName: plan.name,
                planType: plan.type,
                price: plan.price,
                billingCycle: Math.random() > 0.7 ? 'yearly' : 'monthly',
                downloadSpeed: plan.downloadSpeed,
                uploadSpeed: plan.uploadSpeed,
                features: ['Unlimited Data', 'Basic Support'],
                status: user.subscriptionStatus === 'active' ? 'active' : Math.random() > 0.5 ? 'inactive' : 'cancelled',
                startDate,
                nextBillingDate,
                autoRenew: true
            });
        });

        const createdSubscriptions = await Subscription.insertMany(subscriptions);
        console.log(`Created ${createdSubscriptions.length} sample subscriptions`);

        // Create sample payment history for the last 6 months
        await PaymentHistory.deleteMany({}); // Clear existing payment history
        
        const payments = [];
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        createdSubscriptions.forEach(subscription => {
            const user = users.find(u => u._id.toString() === subscription.userId.toString());
            const numPayments = Math.floor(Math.random() * 6) + 1; // 1-6 payments per user
            
            for (let i = 0; i < numPayments; i++) {
                const paymentDate = new Date(sixMonthsAgo);
                paymentDate.setMonth(paymentDate.getMonth() + i);
                paymentDate.setDate(Math.floor(Math.random() * 28) + 1); // Random day of month
                
                payments.push({
                    userId: user._id,
                    subscriptionId: subscription._id,
                    transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
                    amount: subscription.price,
                    paymentMethod: ['credit_card', 'debit_card', 'bank_transfer'][Math.floor(Math.random() * 3)],
                    paymentStatus: Math.random() > 0.05 ? 'completed' : 'failed', // 95% success rate
                    paymentType: subscription.billingCycle === 'yearly' ? 'recurring_yearly' : 'recurring_monthly',
                    description: `Monthly payment for ${subscription.planName}`,
                    planDetails: {
                        planName: subscription.planName,
                        planType: subscription.planType,
                        billingCycle: subscription.billingCycle
                    },
                    paidDate: paymentDate
                });
            }
        });

        const createdPayments = await PaymentHistory.insertMany(payments);
        console.log(`Created ${createdPayments.length} sample payment records`);

        console.log('Analytics data seeding completed successfully!');
        
        // Display summary
        const totalUsers = await User.countDocuments({});
        const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
        const totalRevenue = await PaymentHistory.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        
        console.log('\n=== SEEDING SUMMARY ===');
        console.log(`Total Users: ${totalUsers}`);
        console.log(`Active Subscriptions: ${activeSubscriptions}`);
        console.log(`Total Revenue: $${totalRevenue[0]?.total?.toFixed(2) || 0}`);
        console.log('========================\n');

    } catch (error) {
        console.error('Error seeding analytics data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeding
connectDB().then(() => {
    seedAnalyticsData();
});
