const AIService = require('../services/aiService');

class AIController {
    constructor() {
        this.aiService = new AIService();
    }

    // Get personalized plan recommendations for a user
    async getRecommendations(req, res) {
        try {
            const { userId } = req.params;
            const userData = req.body;

            // Use default values if fields are missing (for demo purposes)
            const requestData = {
                userId: userId || userData.userId || 'demo-user',
                currentPlan: userData.currentPlan || 'basic',
                monthlyUsage: userData.monthlyUsage || userData.usageData || {
                    averageDownload: 250,
                    averageUpload: 50,
                    peakUsage: 400,
                    deviceCount: 8
                },
                preferences: userData.preferences || {
                    budget: 'medium',
                    priority: 'speed',
                    familySize: 4
                }
            };

            console.log('Processing recommendation request:', requestData);

            const recommendations = await this.aiService.generatePlanRecommendations(requestData);
            
            res.json({
                success: true,
                userId: requestData.userId,
                recommendations,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error getting recommendations:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to generate recommendations',
                message: error.message
            });
        }
    }

    // Predict churn risk for a user
    async predictChurn(req, res) {
        try {
            const { userId } = req.params;
            const behaviorData = req.body;

            const churnPrediction = await this.aiService.predictChurnRisk(behaviorData);
            
            res.json({
                success: true,
                userId,
                churnPrediction,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error predicting churn:', error);
            res.status(500).json({
                error: 'Failed to predict churn risk',
                message: error.message
            });
        }
    }

    // Get admin insights and analytics
    async getAdminInsights(req, res) {
        try {
            const analyticsData = req.body;

            const insights = await this.aiService.generateAdminInsights(analyticsData);
            
            res.json({
                success: true,
                insights,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error generating admin insights:', error);
            res.status(500).json({
                error: 'Failed to generate admin insights',
                message: error.message
            });
        }
    }

    // Get pricing optimization recommendations
    async optimizePricing(req, res) {
        try {
            const pricingData = req.body;

            const pricingStrategy = await this.aiService.optimizePricing(pricingData);
            
            res.json({
                success: true,
                pricingStrategy,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error optimizing pricing:', error);
            res.status(500).json({
                error: 'Failed to optimize pricing',
                message: error.message
            });
        }
    }

    // Generate smart notifications for users
    async generateNotifications(req, res) {
        try {
            const { userId } = req.params;
            const userContext = req.body;

            const notifications = await this.aiService.generateSmartNotifications(userContext);
            
            res.json({
                success: true,
                userId,
                notifications,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error generating notifications:', error);
            res.status(500).json({
                error: 'Failed to generate notifications',
                message: error.message
            });
        }
    }

    // Health check endpoint
    async healthCheck(req, res) {
        try {
            const health = await this.aiService.healthCheck();
            res.json(health);
        } catch (error) {
            res.status(500).json({
                status: 'unhealthy',
                error: error.message,
                timestamp: new Date().toISOString()
            });
        }
    }

    // Batch processing for multiple AI operations
    async batchProcess(req, res) {
        try {
            const { operations } = req.body;
            const results = [];

            for (const operation of operations) {
                try {
                    let result;
                    switch (operation.type) {
                        case 'recommendations':
                            result = await this.aiService.generatePlanRecommendations(operation.data);
                            break;
                        case 'churn':
                            result = await this.aiService.predictChurnRisk(operation.data);
                            break;
                        case 'insights':
                            result = await this.aiService.generateAdminInsights(operation.data);
                            break;
                        case 'pricing':
                            result = await this.aiService.optimizePricing(operation.data);
                            break;
                        case 'notifications':
                            result = await this.aiService.generateSmartNotifications(operation.data);
                            break;
                        default:
                            throw new Error(`Unknown operation type: ${operation.type}`);
                    }
                    
                    results.push({
                        id: operation.id,
                        type: operation.type,
                        success: true,
                        result
                    });
                } catch (error) {
                    results.push({
                        id: operation.id,
                        type: operation.type,
                        success: false,
                        error: error.message
                    });
                }
            }

            res.json({
                success: true,
                results,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error in batch processing:', error);
            res.status(500).json({
                error: 'Batch processing failed',
                message: error.message
            });
        }
    }
}

module.exports = AIController;
