// Comprehensive mock data for AI-powered subscription management system

// User profiles with usage patterns
const mockUsers = [
    {
        userId: "user_001",
        name: "John Smith",
        email: "john.smith@email.com",
        userType: "heavy_streamer",
        familySize: 4,
        registrationDate: "2023-01-15",
        currentPlan: {
            planId: "plan_basic_50",
            name: "Basic Broadband 50GB",
            price: 29.99,
            dataLimit: 50,
            speed: "25 Mbps",
            startDate: "2024-01-01",
            renewalDate: "2024-12-01"
        },
        usageData: {
            monthlyUsage: 75, // GB
            usagePattern: "Heavy streaming in evenings, work from home during day",
            peakUsageTimes: ["6PM-11PM", "9AM-5PM"],
            averageDaily: 2.5,
            usageHistory: [
                { month: "2024-01", usage: 68 },
                { month: "2024-02", usage: 72 },
                { month: "2024-03", usage: 75 },
                { month: "2024-04", usage: 78 },
                { month: "2024-05", usage: 82 }
            ]
        },
        preferences: {
            budgetMin: 30,
            budgetMax: 80,
            notificationTypes: ["usage", "recommendations", "offers"],
            frequency: "weekly",
            channels: ["email", "app"]
        },
        behaviorData: {
            subscriptionDuration: 18, // months
            usageTrend: "increasing",
            supportTickets: 1,
            paymentHistory: "excellent",
            planChanges: "none",
            engagementScore: 8,
            competitorActivity: "low"
        }
    },
    {
        userId: "user_002",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        userType: "casual_user",
        familySize: 2,
        registrationDate: "2022-06-10",
        currentPlan: {
            planId: "plan_premium_100",
            name: "Premium Broadband 100GB",
            price: 49.99,
            dataLimit: 100,
            speed: "50 Mbps",
            startDate: "2023-06-01",
            renewalDate: "2024-06-01"
        },
        usageData: {
            monthlyUsage: 35,
            usagePattern: "Light browsing and occasional streaming",
            peakUsageTimes: ["7PM-10PM"],
            averageDaily: 1.2,
            usageHistory: [
                { month: "2024-01", usage: 32 },
                { month: "2024-02", usage: 28 },
                { month: "2024-03", usage: 35 },
                { month: "2024-04", usage: 30 },
                { month: "2024-05", usage: 33 }
            ]
        },
        preferences: {
            budgetMin: 20,
            budgetMax: 50,
            notificationTypes: ["usage", "offers"],
            frequency: "monthly",
            channels: ["email"]
        },
        behaviorData: {
            subscriptionDuration: 24,
            usageTrend: "stable",
            supportTickets: 0,
            paymentHistory: "excellent",
            planChanges: "upgraded once",
            engagementScore: 6,
            competitorActivity: "moderate"
        }
    },
    {
        userId: "user_003",
        name: "Mike Chen",
        email: "mike.chen@email.com",
        userType: "work_from_home",
        familySize: 3,
        registrationDate: "2021-03-20",
        currentPlan: {
            planId: "plan_ultra_200",
            name: "Ultra Broadband 200GB",
            price: 79.99,
            dataLimit: 200,
            speed: "100 Mbps",
            startDate: "2023-01-01",
            renewalDate: "2024-01-01"
        },
        usageData: {
            monthlyUsage: 145,
            usagePattern: "Heavy work usage during day, family streaming evenings",
            peakUsageTimes: ["9AM-5PM", "7PM-11PM"],
            averageDaily: 4.8,
            usageHistory: [
                { month: "2024-01", usage: 142 },
                { month: "2024-02", usage: 138 },
                { month: "2024-03", usage: 145 },
                { month: "2024-04", usage: 150 },
                { month: "2024-05", usage: 148 }
            ]
        },
        preferences: {
            budgetMin: 60,
            budgetMax: 120,
            notificationTypes: ["usage", "recommendations", "offers", "alerts"],
            frequency: "daily",
            channels: ["email", "app", "sms"]
        },
        behaviorData: {
            subscriptionDuration: 36,
            usageTrend: "stable",
            supportTickets: 2,
            paymentHistory: "excellent",
            planChanges: "upgraded twice",
            engagementScore: 9,
            competitorActivity: "low"
        }
    }
];

// Available subscription plans
const mockPlans = [
    {
        planId: "plan_basic_50",
        name: "Basic Broadband 50GB",
        price: 29.99,
        dataLimit: 50,
        speed: "25 Mbps",
        features: ["Basic support", "Standard streaming", "Email support"],
        category: "basic",
        isActive: true,
        subscribers: 5500,
        churnRate: 12.5
    },
    {
        planId: "plan_premium_100",
        name: "Premium Broadband 100GB",
        price: 49.99,
        dataLimit: 100,
        speed: "50 Mbps",
        features: ["Priority support", "HD streaming", "Gaming optimized", "Phone support"],
        category: "premium",
        isActive: true,
        subscribers: 6000,
        churnRate: 8.2
    },
    {
        planId: "plan_ultra_200",
        name: "Ultra Broadband 200GB",
        price: 79.99,
        dataLimit: 200,
        speed: "100 Mbps",
        features: ["24/7 support", "4K streaming", "Gaming optimized", "Multiple device support", "Priority routing"],
        category: "ultra",
        isActive: true,
        subscribers: 3500,
        churnRate: 6.1
    },
    {
        planId: "plan_unlimited",
        name: "Unlimited Broadband",
        price: 99.99,
        dataLimit: -1, // unlimited
        speed: "200 Mbps",
        features: ["24/7 premium support", "Unlimited data", "4K/8K streaming", "Gaming optimized", "Business features"],
        category: "unlimited",
        isActive: true,
        subscribers: 1200,
        churnRate: 4.3
    }
];

// Competitor pricing data
const mockCompetitorData = [
    {
        competitor: "TelecomA",
        plans: [
            { name: "Basic", price: 27.99, dataLimit: 50, speed: "20 Mbps" },
            { name: "Premium", price: 47.99, dataLimit: 100, speed: "50 Mbps" },
            { name: "Ultra", price: 77.99, dataLimit: 200, speed: "100 Mbps" }
        ],
        marketShare: 25.3,
        customerSatisfaction: 7.2
    },
    {
        competitor: "NetCorp",
        plans: [
            { name: "Starter", price: 32.99, dataLimit: 60, speed: "30 Mbps" },
            { name: "Pro", price: 52.99, dataLimit: 120, speed: "60 Mbps" },
            { name: "Max", price: 82.99, dataLimit: 250, speed: "120 Mbps" }
        ],
        marketShare: 18.7,
        customerSatisfaction: 6.8
    },
    {
        competitor: "FastNet",
        plans: [
            { name: "Essential", price: 29.99, dataLimit: 40, speed: "25 Mbps" },
            { name: "Standard", price: 49.99, dataLimit: 80, speed: "45 Mbps" },
            { name: "Premium", price: 79.99, dataLimit: 180, speed: "90 Mbps" }
        ],
        marketShare: 15.2,
        customerSatisfaction: 7.5
    }
];

// Analytics data for admin insights
const mockAnalyticsData = {
    totalSubscribers: 15000,
    growthRate: 5.2, // monthly %
    churnRate: 8.5, // monthly %
    arpu: 52.30, // Average Revenue Per User
    cac: 85.00, // Customer Acquisition Cost
    ltv: 624.00, // Customer Lifetime Value
    planDistribution: {
        "Basic": 37,
        "Premium": 40,
        "Ultra": 23
    },
    seasonalTrends: {
        "Q1_2024": { subscribers: 14200, churn: 9.2, revenue: 742600 },
        "Q2_2024": { subscribers: 14800, churn: 7.8, revenue: 774400 },
        "Q3_2024": { subscribers: 15000, churn: 8.5, revenue: 784500 }
    },
    topPlans: [
        { planId: "plan_premium_100", name: "Premium Broadband 100GB", subscribers: 6000, revenue: 299940 },
        { planId: "plan_basic_50", name: "Basic Broadband 50GB", subscribers: 5500, revenue: 164945 },
        { planId: "plan_ultra_200", name: "Ultra Broadband 200GB", subscribers: 3500, revenue: 279965 }
    ],
    usagePatterns: {
        peakHours: ["7PM-11PM", "9AM-12PM"],
        averageUsage: 68.5,
        overageUsers: 1250,
        underutilizedUsers: 3200
    }
};

// Pricing optimization data
const mockPricingData = {
    currentPlans: mockPlans,
    competitorPricing: mockCompetitorData,
    marketDemand: "high for mid-tier plans, growing demand for unlimited",
    priceSensitivity: "moderate - 15% price elasticity",
    costStructure: {
        infrastructure: 15.00,
        support: 8.00,
        marketing: 12.00,
        operations: 5.00,
        targetMargin: 25.00
    },
    revenueGoals: {
        monthly: 850000,
        quarterly: 2550000,
        annual: 10200000
    },
    marketConditions: {
        competitionLevel: "high",
        regulatoryChanges: "none expected",
        economicOutlook: "stable",
        technologyTrends: "5G adoption increasing"
    }
};

// Notification contexts for different scenarios
const mockNotificationContexts = [
    {
        userId: "user_001",
        scenario: "approaching_limit",
        context: {
            currentUsage: 42,
            planLimit: 50,
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
        }
    },
    {
        userId: "user_002",
        scenario: "underutilization",
        context: {
            currentUsage: 25,
            planLimit: 100,
            daysRemaining: 15,
            usageTrend: "stable_low",
            previousNotifications: [
                { type: "plan_optimization", sent: "2024-01-05", acknowledged: false }
            ],
            preferences: {
                notificationTypes: ["usage", "offers"],
                frequency: "monthly",
                channels: ["email"]
            }
        }
    },
    {
        userId: "user_003",
        scenario: "renewal_reminder",
        context: {
            currentUsage: 140,
            planLimit: 200,
            daysRemaining: 3,
            usageTrend: "stable",
            renewalDate: "2024-06-01",
            previousNotifications: [
                { type: "renewal_reminder", sent: "2024-05-15", acknowledged: true }
            ],
            preferences: {
                notificationTypes: ["usage", "recommendations", "offers", "alerts"],
                frequency: "daily",
                channels: ["email", "app", "sms"]
            }
        }
    }
];

// Batch processing examples
const mockBatchOperations = [
    {
        id: "batch_001",
        operations: [
            {
                id: "op1",
                type: "recommendations",
                userId: "user_001",
                data: mockUsers[0]
            },
            {
                id: "op2",
                type: "churn",
                userId: "user_001",
                data: mockUsers[0].behaviorData
            },
            {
                id: "op3",
                type: "notifications",
                userId: "user_001",
                data: mockNotificationContexts[0].context
            }
        ]
    },
    {
        id: "batch_002",
        operations: [
            {
                id: "op4",
                type: "insights",
                data: mockAnalyticsData
            },
            {
                id: "op5",
                type: "pricing",
                data: mockPricingData
            }
        ]
    }
];

// Export all mock data
module.exports = {
    mockUsers,
    mockPlans,
    mockCompetitorData,
    mockAnalyticsData,
    mockPricingData,
    mockNotificationContexts,
    mockBatchOperations,
    
    // Helper functions to get specific data
    getUserById: (userId) => mockUsers.find(user => user.userId === userId),
    getPlanById: (planId) => mockPlans.find(plan => plan.planId === planId),
    getRecommendationData: (userId) => {
        const user = mockUsers.find(u => u.userId === userId);
        if (!user) return null;
        
        return {
            currentPlan: user.currentPlan.name,
            monthlyUsage: user.usageData.monthlyUsage,
            usagePattern: user.usageData.usagePattern,
            budgetMin: user.preferences.budgetMin,
            budgetMax: user.preferences.budgetMax,
            userType: user.userType,
            familySize: user.familySize,
            peakUsageTimes: user.usageData.peakUsageTimes,
            availablePlans: mockPlans
        };
    },
    
    getChurnData: (userId) => {
        const user = mockUsers.find(u => u.userId === userId);
        return user ? user.behaviorData : null;
    },
    
    getNotificationContext: (userId, scenario = null) => {
        if (scenario) {
            return mockNotificationContexts.find(ctx => 
                ctx.userId === userId && ctx.scenario === scenario
            )?.context;
        }
        return mockNotificationContexts.find(ctx => ctx.userId === userId)?.context;
    }
};
