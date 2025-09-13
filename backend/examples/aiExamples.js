// Example usage of AI endpoints for subscription management system

const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/ai';

// Example 1: Get personalized plan recommendations
async function getPersonalizedRecommendations() {
    const userData = {
        currentPlan: "Basic Broadband 50GB",
        monthlyUsage: 75, // GB
        usagePattern: "Heavy streaming in evenings, work from home during day",
        budgetMin: 30,
        budgetMax: 80,
        userType: "heavy streamer",
        familySize: 4,
        peakUsageTimes: ["6PM-11PM", "9AM-5PM"],
        availablePlans: [
            {
                name: "Basic Broadband 50GB",
                price: 29.99,
                dataLimit: 50,
                speed: "25 Mbps",
                features: ["Basic support", "Standard streaming"]
            },
            {
                name: "Premium Broadband 100GB",
                price: 49.99,
                dataLimit: 100,
                speed: "50 Mbps",
                features: ["Priority support", "HD streaming", "Gaming optimized"]
            },
            {
                name: "Ultra Broadband 200GB",
                price: 79.99,
                dataLimit: 200,
                speed: "100 Mbps",
                features: ["24/7 support", "4K streaming", "Gaming optimized", "Multiple device support"]
            }
        ]
    };

    try {
        const response = await axios.post(`${BASE_URL}/users/user123/recommendations`, userData);
        console.log('Personalized Recommendations:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error getting recommendations:', error.response?.data || error.message);
    }
}

// Example 2: Predict churn risk
async function predictChurnRisk() {
    const behaviorData = {
        subscriptionDuration: 18, // months
        usageTrend: "declining",
        supportTickets: 3,
        paymentHistory: "2 late payments in last 6 months",
        planChanges: "downgraded twice in last year",
        engagementScore: 4,
        competitorActivity: "high promotional offers in area"
    };

    try {
        const response = await axios.post(`${BASE_URL}/users/user123/churn-prediction`, behaviorData);
        console.log('Churn Prediction:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error predicting churn:', error.response?.data || error.message);
    }
}

// Example 3: Generate admin insights
async function getAdminInsights() {
    const analyticsData = {
        totalSubscribers: 15000,
        growthRate: 5.2,
        topPlans: [
            { name: "Premium Broadband 100GB", subscribers: 6000 },
            { name: "Basic Broadband 50GB", subscribers: 5500 },
            { name: "Ultra Broadband 200GB", subscribers: 3500 }
        ],
        churnRate: 8.5,
        arpu: 52.30,
        cac: 85.00,
        planDistribution: {
            "Basic": 37,
            "Premium": 40,
            "Ultra": 23
        },
        seasonalTrends: {
            "Q1": { subscribers: 14200, churn: 9.2 },
            "Q2": { subscribers: 14800, churn: 7.8 },
            "Q3": { subscribers: 15000, churn: 8.5 }
        }
    };

    try {
        const response = await axios.post(`${BASE_URL}/admin/insights`, analyticsData);
        console.log('Admin Insights:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error getting admin insights:', error.response?.data || error.message);
    }
}

// Example 4: Optimize pricing strategy
async function optimizePricing() {
    const pricingData = {
        currentPlans: [
            { name: "Basic", price: 29.99, subscribers: 5500 },
            { name: "Premium", price: 49.99, subscribers: 6000 },
            { name: "Ultra", price: 79.99, subscribers: 3500 }
        ],
        competitorPricing: [
            { competitor: "CompetitorA", basicPrice: 27.99, premiumPrice: 47.99 },
            { competitor: "CompetitorB", basicPrice: 32.99, premiumPrice: 52.99 }
        ],
        marketDemand: "high for mid-tier plans",
        priceSensitivity: "moderate",
        costStructure: {
            infrastructure: 15.00,
            support: 8.00,
            marketing: 12.00,
            margin: 20.00
        },
        revenueGoals: 850000
    };

    try {
        const response = await axios.post(`${BASE_URL}/admin/pricing-optimization`, pricingData);
        console.log('Pricing Optimization:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error optimizing pricing:', error.response?.data || error.message);
    }
}

// Example 5: Generate smart notifications
async function generateSmartNotifications() {
    const userContext = {
        currentUsage: 42, // GB
        planLimit: 50, // GB
        daysRemaining: 8,
        usageTrend: "increasing",
        previousNotifications: [
            { type: "usage_alert", sent: "2024-01-10", acknowledged: true }
        ],
        preferences: {
            notificationTypes: ["usage", "recommendations", "offers"],
            frequency: "weekly",
            channels: ["email", "app"]
        }
    };

    try {
        const response = await axios.post(`${BASE_URL}/users/user123/notifications`, userContext);
        console.log('Smart Notifications:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error generating notifications:', error.response?.data || error.message);
    }
}

// Example 6: Batch processing multiple AI operations
async function batchProcessing() {
    const operations = [
        {
            id: "op1",
            type: "recommendations",
            data: {
                currentPlan: "Basic Broadband 50GB",
                monthlyUsage: 75,
                usagePattern: "Heavy streaming",
                budgetMin: 30,
                budgetMax: 80,
                userType: "heavy streamer",
                familySize: 4,
                peakUsageTimes: ["6PM-11PM"],
                availablePlans: [
                    { name: "Premium", price: 49.99, dataLimit: 100, speed: "50 Mbps" }
                ]
            }
        },
        {
            id: "op2",
            type: "churn",
            data: {
                subscriptionDuration: 18,
                usageTrend: "declining",
                supportTickets: 3,
                paymentHistory: "good",
                planChanges: "none",
                engagementScore: 7,
                competitorActivity: "low"
            }
        }
    ];

    try {
        const response = await axios.post(`${BASE_URL}/batch`, { operations });
        console.log('Batch Processing Results:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Error in batch processing:', error.response?.data || error.message);
    }
}

// Health check
async function healthCheck() {
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        console.log('AI Service Health:', JSON.stringify(response.data, null, 2));
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error.response?.data || error.message);
    }
}

// Run all examples
async function runAllExamples() {
    console.log('🤖 Running AI Service Examples...\n');
    
    console.log('1. Health Check:');
    await healthCheck();
    
    console.log('\n2. Personalized Recommendations:');
    await getPersonalizedRecommendations();
    
    console.log('\n3. Churn Risk Prediction:');
    await predictChurnRisk();
    
    console.log('\n4. Admin Insights:');
    await getAdminInsights();
    
    console.log('\n5. Pricing Optimization:');
    await optimizePricing();
    
    console.log('\n6. Smart Notifications:');
    await generateSmartNotifications();
    
    console.log('\n7. Batch Processing:');
    await batchProcessing();
}

// Export functions for individual use
module.exports = {
    getPersonalizedRecommendations,
    predictChurnRisk,
    getAdminInsights,
    optimizePricing,
    generateSmartNotifications,
    batchProcessing,
    healthCheck,
    runAllExamples
};

// Run examples if this file is executed directly
if (require.main === module) {
    runAllExamples();
}
