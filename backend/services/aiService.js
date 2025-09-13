const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class AIService {
    constructor() {
        try {
            if (!process.env.GEMINI_API_KEY) {
                console.warn('⚠️  GEMINI_API_KEY not found in environment variables');
                this.genAI = null;
                this.model = null;
            } else {
                this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
                this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
                console.log('✅ Gemini AI service initialized successfully');
            }
        } catch (error) {
            console.error('❌ Failed to initialize Gemini AI service:', error.message);
            this.genAI = null;
            this.model = null;
        }
    }

    // Generate personalized plan recommendations based on user usage data
    async generatePlanRecommendations(userData) {
        // Fallback to mock data if AI service is not available
        if (!this.model) {
            console.log('🔄 Using mock recommendations (Gemini API not available)');
            return this.getMockRecommendations(userData);
        }

        const usageData = userData.monthlyUsage || userData.usageData || {};
        const preferences = userData.preferences || {};
        
        const prompt = `
        Analyze the following user data and provide personalized broadband plan recommendations:
        
        User Profile:
        - Current Plan: ${userData.currentPlan || 'basic'}
        - Average Download Usage: ${usageData.averageDownload || 250} GB/month
        - Average Upload Usage: ${usageData.averageUpload || 50} GB/month
        - Peak Usage: ${usageData.peakUsage || 400} GB/month
        - Device Count: ${usageData.deviceCount || 8}
        - Budget Preference: ${preferences.budget || 'medium'}
        - Priority: ${preferences.priority || 'speed'}
        - Family Size: ${preferences.familySize || 4}
        
        Available Plans:
        1. Basic Fiber - $39.99/month, 100 Mbps down, 20 Mbps up
        2. Premium Fiber - $59.99/month, 500 Mbps down, 100 Mbps up
        3. Ultra Fiber - $89.99/month, 1000 Mbps down, 500 Mbps up
        4. Business Pro - $149.99/month, 1000 Mbps down, 1000 Mbps up
        
        Provide exactly 2-3 plan recommendations in this JSON format:
        [
          {
            "planName": "Plan Name",
            "price": 59.99,
            "downloadSpeed": 500,
            "uploadSpeed": 100,
            "confidence": 0.92,
            "reasoning": "Detailed explanation why this plan fits the user",
            "features": ["Feature 1", "Feature 2", "Feature 3"]
          }
        ]
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            const aiText = response.text();
            console.log('🤖 AI Response received:', aiText.substring(0, 200) + '...');
            return this.parseAIResponse(aiText);
        } catch (error) {
            console.error('Error generating plan recommendations:', error);
            console.log('🔄 Falling back to mock recommendations due to API error');
            return this.getMockRecommendations(userData);
        }
    }

    // Mock recommendations for when AI service is unavailable
    getMockRecommendations(userData) {
        const usageData = userData.monthlyUsage || userData.usageData || {};
        const preferences = userData.preferences || {};
        
        // Simple logic based on usage patterns
        const averageDownload = usageData.averageDownload || 250;
        const familySize = preferences.familySize || 4;
        
        let recommendations = [];
        
        if (averageDownload < 200 && familySize <= 2) {
            recommendations.push({
                planName: 'Basic Fiber',
                price: 39.99,
                downloadSpeed: 100,
                uploadSpeed: 20,
                confidence: 0.85,
                reasoning: 'Perfect for light internet usage and small households. Provides reliable speeds for basic browsing and streaming.',
                features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract']
            });
        }
        
        recommendations.push({
            planName: 'Premium Fiber',
            price: 59.99,
            downloadSpeed: 500,
            uploadSpeed: 100,
            confidence: 0.92,
            reasoning: 'Ideal for your usage patterns and family size. Offers excellent speed for streaming, gaming, and multiple devices.',
            features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract']
        });
        
        if (averageDownload > 400 || familySize > 4) {
            recommendations.push({
                planName: 'Ultra Fiber',
                price: 89.99,
                downloadSpeed: 1000,
                uploadSpeed: 500,
                confidence: 0.78,
                reasoning: 'Future-proof option for heavy usage and large families. Handles peak times and multiple high-bandwidth activities.',
                features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract']
            });
        }
        
        return recommendations.slice(0, 3); // Return max 3 recommendations
    }

    // Predict churn risk based on user behavior
    async predictChurnRisk(userBehaviorData) {
        const prompt = `
        Analyze the following user behavior data to predict churn risk:
        
        User Behavior:
        - Subscription Duration: ${userBehaviorData.subscriptionDuration} months
        - Recent Usage Trend: ${userBehaviorData.usageTrend}
        - Support Tickets: ${userBehaviorData.supportTickets}
        - Payment History: ${userBehaviorData.paymentHistory}
        - Plan Changes: ${userBehaviorData.planChanges}
        - Engagement Score: ${userBehaviorData.engagementScore}/10
        - Competitor Activity: ${userBehaviorData.competitorActivity}
        
        Provide:
        1. Churn risk score (0-100)
        2. Key risk factors
        3. Recommended retention strategies
        4. Optimal intervention timing
        
        Format as JSON with actionable insights.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseAIResponse(response.text());
        } catch (error) {
            console.error('Error predicting churn risk:', error);
            throw new Error('Failed to predict churn risk');
        }
    }

    // Generate admin insights and recommendations
    async generateAdminInsights(analyticsData) {
        const prompt = `
        Analyze the following subscription analytics data and provide business insights:
        
        Analytics Data:
        - Total Subscribers: ${analyticsData.totalSubscribers}
        - Monthly Growth Rate: ${analyticsData.growthRate}%
        - Top Performing Plans: ${JSON.stringify(analyticsData.topPlans)}
        - Churn Rate: ${analyticsData.churnRate}%
        - Average Revenue Per User: $${analyticsData.arpu}
        - Customer Acquisition Cost: $${analyticsData.cac}
        - Plan Distribution: ${JSON.stringify(analyticsData.planDistribution)}
        - Seasonal Trends: ${JSON.stringify(analyticsData.seasonalTrends)}
        
        Provide:
        1. Key performance insights
        2. Plan optimization recommendations
        3. Pricing strategy suggestions
        4. Market opportunity identification
        5. Risk areas and mitigation strategies
        
        Format as comprehensive business report in JSON.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseAIResponse(response.text());
        } catch (error) {
            console.error('Error generating admin insights:', error);
            throw new Error('Failed to generate admin insights');
        }
    }

    // Optimize pricing strategy
    async optimizePricing(pricingData) {
        const prompt = `
        Analyze pricing data and market conditions to recommend optimal pricing strategy:
        
        Current Pricing Data:
        - Current Plans: ${JSON.stringify(pricingData.currentPlans)}
        - Competitor Pricing: ${JSON.stringify(pricingData.competitorPricing)}
        - Market Demand: ${pricingData.marketDemand}
        - Customer Price Sensitivity: ${pricingData.priceSensitivity}
        - Cost Structure: ${JSON.stringify(pricingData.costStructure)}
        - Revenue Goals: $${pricingData.revenueGoals}
        
        Provide:
        1. Recommended price adjustments
        2. New plan suggestions
        3. Discount strategy recommendations
        4. Revenue impact projections
        5. Implementation timeline
        
        Format as detailed pricing strategy in JSON.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseAIResponse(response.text());
        } catch (error) {
            console.error('Error optimizing pricing:', error);
            throw new Error('Failed to optimize pricing');
        }
    }

    // Generate smart notifications for users
    async generateSmartNotifications(userContext) {
        const prompt = `
        Generate personalized notifications for the user based on their context:
        
        User Context:
        - Current Usage: ${userContext.currentUsage} GB
        - Plan Limit: ${userContext.planLimit} GB
        - Days Remaining: ${userContext.daysRemaining}
        - Usage Trend: ${userContext.usageTrend}
        - Previous Notifications: ${JSON.stringify(userContext.previousNotifications)}
        - User Preferences: ${JSON.stringify(userContext.preferences)}
        
        Generate appropriate notifications for:
        1. Usage alerts
        2. Plan recommendations
        3. Renewal reminders
        4. Promotional offers
        
        Format as JSON with notification type, message, and priority.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseAIResponse(response.text());
        } catch (error) {
            console.error('Error generating notifications:', error);
            throw new Error('Failed to generate notifications');
        }
    }

    // Parse AI response and handle JSON extraction
    parseAIResponse(responseText) {
        try {
            // Remove markdown code blocks if present
            let cleanText = responseText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
            
            // Try to extract JSON array from the response
            const arrayMatch = cleanText.match(/\[[\s\S]*\]/);
            if (arrayMatch) {
                return JSON.parse(arrayMatch[0]);
            }
            
            // Try to extract JSON object from the response
            const objectMatch = cleanText.match(/\{[\s\S]*\}/);
            if (objectMatch) {
                return JSON.parse(objectMatch[0]);
            }
            
            // If no JSON found, return structured response
            return {
                success: true,
                content: responseText,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                success: false,
                content: responseText,
                error: 'Failed to parse response',
                timestamp: new Date().toISOString()
            };
        }
    }

    // Health check for AI service
    async healthCheck() {
        try {
            const result = await this.model.generateContent("Respond with 'AI Service is healthy'");
            const response = await result.response;
            return {
                status: 'healthy',
                message: response.text(),
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
}

module.exports = AIService;
