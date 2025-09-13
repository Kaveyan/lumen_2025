// Test AI endpoints with comprehensive mock data

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const AIService = require('../services/aiService');
const { 
    mockUsers, 
    mockPlans, 
    mockAnalyticsData, 
    mockPricingData,
    getRecommendationData,
    getChurnData,
    getNotificationContext
} = require('../data/mockData');

async function testAIWithMockData() {
    console.log('🤖 Testing AI Service with Gemini 2.0 Flash and Mock Data...\n');
    
    const aiService = new AIService();
    
    try {
        // Test 1: Health Check
        console.log('1. Health Check:');
        const health = await aiService.healthCheck();
        console.log(JSON.stringify(health, null, 2));
        
        if (health.status === 'unhealthy') {
            console.log('\n❌ AI Service is not healthy. Please enable Gemini API first.');
            console.log('Visit: https://console.developers.google.com/apis/api/generativelanguage.googleapis.com');
            return;
        }
        
        // Test 2: Plan Recommendations with Mock Data
        console.log('\n2. Testing Plan Recommendations with Mock User Data:');
        const userId = 'user_001'; // Heavy streamer
        const recommendationData = getRecommendationData(userId);
        console.log('Input Data:', JSON.stringify(recommendationData, null, 2));
        
        const recommendations = await aiService.generatePlanRecommendations(recommendationData);
        console.log('AI Recommendations:', JSON.stringify(recommendations, null, 2));
        
        // Test 3: Churn Prediction with Mock Data
        console.log('\n3. Testing Churn Prediction with Mock User Data:');
        const churnData = getChurnData(userId);
        console.log('Behavior Data:', JSON.stringify(churnData, null, 2));
        
        const churnPrediction = await aiService.predictChurnRisk(churnData);
        console.log('Churn Prediction:', JSON.stringify(churnPrediction, null, 2));
        
        // Test 4: Admin Insights with Mock Analytics
        console.log('\n4. Testing Admin Insights with Mock Analytics:');
        console.log('Analytics Input:', JSON.stringify(mockAnalyticsData, null, 2));
        
        const adminInsights = await aiService.generateAdminInsights(mockAnalyticsData);
        console.log('Admin Insights:', JSON.stringify(adminInsights, null, 2));
        
        // Test 5: Pricing Optimization
        console.log('\n5. Testing Pricing Optimization:');
        console.log('Pricing Data Input:', JSON.stringify(mockPricingData, null, 2));
        
        const pricingStrategy = await aiService.optimizePricing(mockPricingData);
        console.log('Pricing Strategy:', JSON.stringify(pricingStrategy, null, 2));
        
        // Test 6: Smart Notifications
        console.log('\n6. Testing Smart Notifications:');
        const notificationContext = getNotificationContext(userId, 'approaching_limit');
        console.log('Notification Context:', JSON.stringify(notificationContext, null, 2));
        
        const notifications = await aiService.generateSmartNotifications(notificationContext);
        console.log('Smart Notifications:', JSON.stringify(notifications, null, 2));
        
        console.log('\n✅ All AI tests completed successfully with mock data!');
        console.log('\n📊 Mock Data Summary:');
        console.log(`- ${mockUsers.length} test users with different profiles`);
        console.log(`- ${mockPlans.length} subscription plans`);
        console.log('- Complete analytics and pricing data');
        console.log('- Various notification scenarios');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('Full error:', error);
    }
}

// Test individual scenarios
async function testSpecificScenarios() {
    console.log('\n🎯 Testing Specific User Scenarios...\n');
    
    const aiService = new AIService();
    
    // Scenario 1: Heavy user needing upgrade
    console.log('Scenario 1: Heavy Streamer (John) - Exceeding Current Plan');
    const heavyUser = getRecommendationData('user_001');
    console.log(`Current: ${heavyUser.currentPlan}, Usage: ${heavyUser.monthlyUsage}GB`);
    
    try {
        const recommendation = await aiService.generatePlanRecommendations(heavyUser);
        console.log('Recommendation:', recommendation.success ? 'Generated successfully' : 'Failed');
    } catch (error) {
        console.log('Error:', error.message);
    }
    
    // Scenario 2: Light user potentially overpaying
    console.log('\nScenario 2: Casual User (Sarah) - Potential Downgrade');
    const lightUser = getRecommendationData('user_002');
    console.log(`Current: ${lightUser.currentPlan}, Usage: ${lightUser.monthlyUsage}GB`);
    
    try {
        const recommendation = await aiService.generatePlanRecommendations(lightUser);
        console.log('Recommendation:', recommendation.success ? 'Generated successfully' : 'Failed');
    } catch (error) {
        console.log('Error:', error.message);
    }
    
    // Scenario 3: Work from home user with optimal plan
    console.log('\nScenario 3: Work from Home (Mike) - Plan Optimization');
    const wfhUser = getRecommendationData('user_003');
    console.log(`Current: ${wfhUser.currentPlan}, Usage: ${wfhUser.monthlyUsage}GB`);
    
    try {
        const recommendation = await aiService.generatePlanRecommendations(wfhUser);
        console.log('Recommendation:', recommendation.success ? 'Generated successfully' : 'Failed');
    } catch (error) {
        console.log('Error:', error.message);
    }
}

// Run comprehensive tests
async function runAllTests() {
    await testAIWithMockData();
    await testSpecificScenarios();
}

// Export for use in other files
module.exports = {
    testAIWithMockData,
    testSpecificScenarios,
    runAllTests
};

// Run if executed directly
if (require.main === module) {
    runAllTests();
}
