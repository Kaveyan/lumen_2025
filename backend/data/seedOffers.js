const mongoose = require('mongoose');
const Offer = require('../models/Offer');

const seedOffers = async () => {
    try {
        // Clear existing offers
        await Offer.deleteMany({});

        const offers = [
            {
                title: 'New Customer Special',
                description: 'First 3 months at half price for new customers',
                discountType: 'percentage',
                discountPercentage: 50,
                badge: '50% OFF',
                validFrom: new Date(),
                validUntil: new Date('2025-03-31'),
                isActive: true,
                eligibility: ['new_customers'],
                applicablePlans: ['basic-fiber', 'premium-fiber', 'ultra-fiber'],
                terms: 'Valid for new customers only. Discount applies to first 3 months.',
                priority: 10
            },
            {
                title: 'Upgrade Bonus',
                description: 'Free premium router with fiber upgrade',
                discountType: 'free_item',
                freeItem: 'Premium Router',
                badge: 'FREE Router',
                validFrom: new Date(),
                validUntil: new Date('2025-02-28'),
                isActive: true,
                eligibility: ['existing_customers', 'upgrade_only'],
                applicablePlans: ['premium-fiber', 'ultra-fiber'],
                terms: 'Free router worth $150 with upgrade to fiber plans.',
                priority: 8
            },
            {
                title: 'Business Bundle Deal',
                description: 'Save $50/month on Business Fiber Pro plans',
                discountType: 'fixed_amount',
                discountAmount: 50,
                badge: '$50 OFF',
                validFrom: new Date(),
                validUntil: new Date('2025-04-30'),
                isActive: true,
                eligibility: ['all'],
                applicablePlans: ['business-fiber-pro'],
                terms: 'Monthly discount for first 12 months on Business Fiber Pro.',
                priority: 6
            },
            {
                title: 'Student Discount',
                description: '25% off all plans with valid student ID',
                discountType: 'percentage',
                discountPercentage: 25,
                badge: '25% OFF',
                validFrom: new Date(),
                validUntil: new Date('2025-12-31'),
                isActive: true,
                eligibility: ['all'],
                applicablePlans: ['basic-fiber', 'premium-fiber', 'basic-copper', 'standard-copper'],
                terms: 'Valid student ID required. Ongoing discount.',
                priority: 4
            }
        ];

        await Offer.insertMany(offers);
        console.log('✅ Offers seeded successfully');
        return offers;
    } catch (error) {
        console.error('❌ Error seeding offers:', error);
        throw error;
    }
};

module.exports = { seedOffers };

// Run seeding if this file is executed directly
if (require.main === module) {
    const connectDB = require('../config/database');
    
    const runSeed = async () => {
        try {
            await connectDB();
            await seedOffers();
            console.log('Seeding completed');
            process.exit(0);
        } catch (error) {
            console.error('Seeding failed:', error);
            process.exit(1);
        }
    };
    
    runSeed();
}
