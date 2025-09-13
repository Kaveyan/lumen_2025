# 📊 Database Requirements & Data Structures

## Overview
This document outlines all required database schemas, data structures, and API requirements for the AI-powered subscription management system.

## 🗄️ Database Schema Requirements

### 1. Users Table
```sql
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20),
    user_type ENUM('heavy_streamer', 'casual_user', 'work_from_home', 'gamer', 'family', 'business') NOT NULL,
    family_size INTEGER DEFAULT 1,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'suspended', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. Plans Table
```sql
CREATE TABLE plans (
    plan_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    data_limit INTEGER, -- GB, -1 for unlimited
    speed VARCHAR(20) NOT NULL, -- e.g., "25 Mbps"
    category ENUM('basic', 'premium', 'ultra', 'unlimited') NOT NULL,
    features JSON, -- ["Basic support", "Standard streaming"]
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3. Subscriptions Table
```sql
CREATE TABLE subscriptions (
    subscription_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    plan_id VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    renewal_date DATE NOT NULL,
    status ENUM('active', 'cancelled', 'suspended', 'expired') DEFAULT 'active',
    auto_renew BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (plan_id) REFERENCES plans(plan_id)
);
```

### 4. Usage Data Table
```sql
CREATE TABLE usage_data (
    usage_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    subscription_id VARCHAR(50) NOT NULL,
    usage_date DATE NOT NULL,
    data_used DECIMAL(10,2) NOT NULL, -- GB
    peak_usage_times JSON, -- ["6PM-11PM", "9AM-5PM"]
    usage_pattern TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id),
    INDEX idx_user_date (user_id, usage_date)
);
```

### 5. User Preferences Table
```sql
CREATE TABLE user_preferences (
    preference_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    budget_min DECIMAL(10,2),
    budget_max DECIMAL(10,2),
    notification_types JSON, -- ["usage", "recommendations", "offers"]
    notification_frequency ENUM('daily', 'weekly', 'monthly') DEFAULT 'weekly',
    notification_channels JSON, -- ["email", "app", "sms"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 6. Behavior Analytics Table
```sql
CREATE TABLE behavior_analytics (
    analytics_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    subscription_duration INTEGER, -- months
    usage_trend ENUM('increasing', 'decreasing', 'stable', 'declining') DEFAULT 'stable',
    support_tickets INTEGER DEFAULT 0,
    payment_history ENUM('excellent', 'good', 'fair', 'poor') DEFAULT 'good',
    plan_changes INTEGER DEFAULT 0,
    engagement_score INTEGER CHECK (engagement_score >= 0 AND engagement_score <= 10),
    competitor_activity ENUM('low', 'moderate', 'high') DEFAULT 'low',
    churn_risk_score DECIMAL(5,2), -- 0-100
    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 7. Support Tickets Table
```sql
CREATE TABLE support_tickets (
    ticket_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    category ENUM('technical', 'billing', 'plan_change', 'cancellation', 'other') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 8. Notifications Table
```sql
CREATE TABLE notifications (
    notification_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    type ENUM('usage_alert', 'plan_recommendation', 'renewal_reminder', 'promotional_offer', 'churn_prevention') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    channel ENUM('email', 'app', 'sms') NOT NULL,
    status ENUM('pending', 'sent', 'delivered', 'read', 'failed') DEFAULT 'pending',
    sent_at TIMESTAMP NULL,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### 9. AI Recommendations Table
```sql
CREATE TABLE ai_recommendations (
    recommendation_id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    recommendation_type ENUM('plan_upgrade', 'plan_downgrade', 'usage_optimization', 'cost_saving') NOT NULL,
    current_plan_id VARCHAR(50),
    recommended_plan_id VARCHAR(50),
    reasoning TEXT,
    confidence_score DECIMAL(5,2), -- 0-100
    status ENUM('pending', 'accepted', 'rejected', 'expired') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (current_plan_id) REFERENCES plans(plan_id),
    FOREIGN KEY (recommended_plan_id) REFERENCES plans(plan_id)
);
```

### 10. Competitor Analysis Table
```sql
CREATE TABLE competitor_analysis (
    analysis_id VARCHAR(50) PRIMARY KEY,
    competitor_name VARCHAR(100) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    data_limit INTEGER,
    speed VARCHAR(20),
    features JSON,
    market_share DECIMAL(5,2),
    customer_satisfaction DECIMAL(3,1),
    analysis_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔄 Required API Data Structures

### 1. User Recommendation Request
```json
{
  "userId": "user_001",
  "currentPlan": "Basic Broadband 50GB",
  "monthlyUsage": 75,
  "usagePattern": "Heavy streaming in evenings, work from home during day",
  "budgetMin": 30,
  "budgetMax": 80,
  "userType": "heavy_streamer",
  "familySize": 4,
  "peakUsageTimes": ["6PM-11PM", "9AM-5PM"],
  "availablePlans": [
    {
      "planId": "plan_premium_100",
      "name": "Premium Broadband 100GB",
      "price": 49.99,
      "dataLimit": 100,
      "speed": "50 Mbps",
      "features": ["Priority support", "HD streaming"]
    }
  ]
}
```

### 2. Churn Prediction Request
```json
{
  "userId": "user_001",
  "subscriptionDuration": 18,
  "usageTrend": "declining",
  "supportTickets": 3,
  "paymentHistory": "2 late payments in last 6 months",
  "planChanges": "downgraded twice in last year",
  "engagementScore": 4,
  "competitorActivity": "high promotional offers in area"
}
```

### 3. Admin Analytics Request
```json
{
  "totalSubscribers": 15000,
  "growthRate": 5.2,
  "topPlans": [
    {
      "planId": "plan_premium_100",
      "name": "Premium Broadband 100GB",
      "subscribers": 6000,
      "revenue": 299940
    }
  ],
  "churnRate": 8.5,
  "arpu": 52.30,
  "cac": 85.00,
  "planDistribution": {
    "Basic": 37,
    "Premium": 40,
    "Ultra": 23
  },
  "seasonalTrends": {
    "Q1_2024": {
      "subscribers": 14200,
      "churn": 9.2,
      "revenue": 742600
    }
  }
}
```

### 4. Pricing Optimization Request
```json
{
  "currentPlans": [
    {
      "planId": "plan_basic_50",
      "name": "Basic",
      "price": 29.99,
      "subscribers": 5500
    }
  ],
  "competitorPricing": [
    {
      "competitor": "TelecomA",
      "basicPrice": 27.99,
      "premiumPrice": 47.99
    }
  ],
  "marketDemand": "high for mid-tier plans",
  "priceSensitivity": "moderate",
  "costStructure": {
    "infrastructure": 15.00,
    "support": 8.00,
    "marketing": 12.00,
    "margin": 20.00
  },
  "revenueGoals": 850000
}
```

### 5. Smart Notification Request
```json
{
  "userId": "user_001",
  "currentUsage": 42,
  "planLimit": 50,
  "daysRemaining": 8,
  "usageTrend": "increasing",
  "previousNotifications": [
    {
      "type": "usage_alert",
      "sent": "2024-01-10",
      "acknowledged": true
    }
  ],
  "preferences": {
    "notificationTypes": ["usage", "recommendations", "offers"],
    "frequency": "weekly",
    "channels": ["email", "app"]
  }
}
```

## 📈 Analytics & Reporting Requirements

### 1. User Analytics
- Monthly usage trends
- Plan utilization rates
- Peak usage patterns
- Cost per GB analysis
- User satisfaction scores

### 2. Business Analytics
- Revenue per plan
- Customer acquisition metrics
- Churn analysis by demographics
- Market share analysis
- Competitive positioning

### 3. AI Performance Metrics
- Recommendation acceptance rates
- Churn prediction accuracy
- Revenue impact of AI suggestions
- User engagement improvements

## 🔐 Data Privacy & Security

### 1. PII Protection
- Encrypt sensitive user data
- Anonymize data for AI processing
- GDPR compliance for data handling
- User consent management

### 2. API Security
- Rate limiting on AI endpoints
- Authentication and authorization
- Input validation and sanitization
- Audit logging for all AI operations

## 🚀 Implementation Priority

### Phase 1 (MVP)
1. Users, Plans, Subscriptions tables
2. Basic usage tracking
3. User preferences
4. AI recommendation system

### Phase 2 (Enhanced)
1. Behavior analytics
2. Support ticket integration
3. Notification system
4. Competitor analysis

### Phase 3 (Advanced)
1. Real-time analytics
2. Advanced ML models
3. Predictive maintenance
4. Market intelligence

## 📊 Sample Queries for AI Features

### Get User Data for Recommendations
```sql
SELECT 
    u.user_id, u.name, u.user_type, u.family_size,
    s.plan_id, p.name as current_plan, p.price, p.data_limit,
    AVG(ud.data_used) as avg_monthly_usage,
    up.budget_min, up.budget_max,
    ba.usage_trend, ba.engagement_score
FROM users u
JOIN subscriptions s ON u.user_id = s.user_id
JOIN plans p ON s.plan_id = p.plan_id
JOIN usage_data ud ON u.user_id = ud.user_id
JOIN user_preferences up ON u.user_id = up.user_id
JOIN behavior_analytics ba ON u.user_id = ba.user_id
WHERE u.user_id = ? AND s.status = 'active'
GROUP BY u.user_id;
```

### Get Churn Risk Data
```sql
SELECT 
    u.user_id,
    ba.subscription_duration,
    ba.usage_trend,
    ba.support_tickets,
    ba.payment_history,
    ba.plan_changes,
    ba.engagement_score,
    ba.competitor_activity,
    COUNT(st.ticket_id) as recent_tickets
FROM users u
JOIN behavior_analytics ba ON u.user_id = ba.user_id
LEFT JOIN support_tickets st ON u.user_id = st.user_id 
    AND st.created_at > DATE_SUB(NOW(), INTERVAL 3 MONTH)
WHERE u.user_id = ?
GROUP BY u.user_id;
```

This comprehensive database structure supports all AI features while maintaining data integrity and performance.
