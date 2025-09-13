// Simple test script to demonstrate AI functionality without external dependencies

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const AIService = require('../services/aiService');

async function testAIService() {
    console.log('🤖 Testing AI Service with Gemini API...\n');
    console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
    console.log('API Key length:', process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0);
    
    const aiService = new AIService();
    
    try {
        // Test 1: Health Check
        console.log('1. Health Check:');
        const health = await aiService.healthCheck();
        console.log(JSON.stringify(health, null, 2));
        
        // Test 2: Plan Recommendations
        console.log('\n2. Testing Plan Recommendations:');
        const userData = {
            currentPlan: "Basic Broadband 50GB",
            monthlyUsage: 75,
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
                    speed: "25 Mbps"
                },
                {
                    name: "Premium Broadband 100GB", 
                    price: 49.99,
                    dataLimit: 100,
                    speed: "50 Mbps"
                },
                {
                    name: "Ultra Broadband 200GB",
                    price: 79.99,
                    dataLimit: 200,
                    speed: "100 Mbps"
                }
            ]
        };
        
        const recommendations = await aiService.generatePlanRecommendations(userData);
        console.log('Recommendations:', JSON.stringify(recommendations, null, 2));
        
        // Test 3: Churn Prediction
        console.log('\n3. Testing Churn Prediction:');
        const behaviorData = {
            subscriptionDuration: 18,
            usageTrend: "declining",
            supportTickets: 3,
            paymentHistory: "2 late payments in last 6 months",
            planChanges: "downgraded twice in last year",
            engagementScore: 4,
            competitorActivity: "high promotional offers in area"
        };
        
        const churnPrediction = await aiService.predictChurnRisk(behaviorData);
        console.log('Churn Prediction:', JSON.stringify(churnPrediction, null, 2));
        
        console.log('\n✅ All AI tests completed successfully!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
if (require.main === module) {
    testAIService();
}

module.exports = { testAIService };
