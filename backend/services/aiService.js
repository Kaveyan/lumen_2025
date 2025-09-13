const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class AIService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    }

    // Generate personalized plan recommendations based on user usage data
    async generatePlanRecommendations(userData) {
        const prompt = `
        Analyze the following user data and provide personalized broadband plan recommendations:
        
        User Profile:
        - Current Plan: ${userData.currentPlan}
        - Monthly Data Usage: ${userData.monthlyUsage} GB
        - Usage Pattern: ${userData.usagePattern}
        - Budget Range: $${userData.budgetMin} - $${userData.budgetMax}
        - User Type: ${userData.userType} (e.g., heavy streamer, work from home, casual user)
        - Family Size: ${userData.familySize}
        - Peak Usage Times: ${userData.peakUsageTimes}
        
        Available Plans:
        ${JSON.stringify(userData.availablePlans, null, 2)}
        
        Please provide:
        1. Top 3 recommended plans with reasons
        2. Cost-benefit analysis
        3. Usage optimization tips
        4. Future needs prediction
        
        Format the response as JSON with clear recommendations.
        `;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseAIResponse(response.text());
        } catch (error) {
            console.error('Error generating plan recommendations:', error);
            throw new Error('Failed to generate recommendations');
        }
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
            // Try to extract JSON from the response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
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
