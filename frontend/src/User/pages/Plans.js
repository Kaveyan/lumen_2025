// Browse all available plans

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Plans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subscribing, setSubscribing] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [appliedOffer, setAppliedOffer] = useState(null);

  // Check for applied offer on component mount
  useEffect(() => {
    const savedOffer = localStorage.getItem('selectedOffer');
    if (savedOffer) {
      setAppliedOffer(JSON.parse(savedOffer));
    }
  }, []);

  // Calculate discounted price
  const calculateDiscountedPrice = (originalPrice, offer) => {
    if (!offer) return originalPrice;
    
    switch (offer.discountType) {
      case 'percentage':
        return originalPrice * (1 - offer.discountPercentage / 100);
      case 'fixed_amount':
        return Math.max(0, originalPrice - offer.discountAmount);
      default:
        return originalPrice;
    }
  };

  // Remove applied offer
  const removeOffer = () => {
    localStorage.removeItem('selectedOffer');
    setAppliedOffer(null);
  };

  const mockPlans = [
    {
      id: 'basic-fiber',
      name: 'Basic Fiber',
      type: 'fiber',
      price: 39.99,
      downloadSpeed: 100,
      uploadSpeed: 20,
      features: ['Unlimited Data', 'Free Installation', 'Basic Support', '1 Year Contract'],
      popular: false,
      description: 'Perfect for light internet users and small households'
    },
    {
      id: 'premium-fiber',
      name: 'Premium Fiber',
      type: 'fiber',
      price: 59.99,
      downloadSpeed: 500,
      uploadSpeed: 100,
      features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract'],
      popular: true,
      description: 'Great for streaming, gaming, and medium-sized families'
    },
    {
      id: 'ultra-fiber',
      name: 'Ultra Fiber',
      type: 'fiber',
      price: 89.99,
      downloadSpeed: 1000,
      uploadSpeed: 500,
      features: ['Unlimited Data', 'Premium Router', '24/7 Priority Support', 'No Contract'],
      popular: false,
      description: 'Maximum performance for power users and large households'
    },
    {
      id: 'basic-copper',
      name: 'Basic Copper',
      type: 'copper',
      price: 29.99,
      downloadSpeed: 50,
      uploadSpeed: 10,
      features: ['500GB Data', 'Standard Installation', 'Basic Support', '2 Year Contract'],
      popular: false,
      description: 'Affordable option for basic internet needs'
    },
    {
      id: 'standard-copper',
      name: 'Standard Copper',
      type: 'copper',
      price: 39.99,
      downloadSpeed: 100,
      uploadSpeed: 15,
      features: ['Unlimited Data', 'Free Installation', 'Standard Support', '1 Year Contract'],
      popular: false,
      description: 'Reliable copper connection for everyday use'
    },
    {
      id: 'business-fiber-pro',
      name: 'Business Fiber Pro',
      type: 'business',
      price: 149.99,
      downloadSpeed: 1000,
      uploadSpeed: 1000,
      features: ['Unlimited Data', 'Dedicated Support', 'SLA Guarantee', 'Static IP', 'No Contract'],
      popular: false,
      description: 'Enterprise-grade connectivity for businesses'
    }
  ];

  const fetchPlans = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/subscriptions/plans');
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPlans(data.plans);
        }
      } else {
        // Fallback to mock data if API fails
        setPlans(mockPlans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
      // Fallback to mock data
      setPlans(mockPlans);
    } finally {
      setLoading(false);
    }
  }, [mockPlans]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleSelectPlan = async (planId) => {
    if (!user) {
      setNotification({ show: true, message: 'Please log in to subscribe to a plan', type: 'error' });
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setSubscribing(planId);
    try {
      const token = localStorage.getItem('token');
      console.log('Selecting plan:', planId);
      console.log('Token exists:', !!token);
      
      const response = await fetch('http://localhost:5000/api/subscriptions/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          newPlanId: planId,
          billingCycle: 'monthly'
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok && data.success) {
        setNotification({ 
          show: true, 
          message: `Successfully subscribed to ${plans.find(p => p.id === planId)?.name}! Redirecting to your subscriptions...`, 
          type: 'success' 
        });
        setTimeout(() => navigate('/my-subscriptions'), 2000);
      } else {
        setNotification({ 
          show: true, 
          message: data.message || `Failed to subscribe to plan. Status: ${response.status}`, 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Plan selection error:', error);
      setNotification({ 
        show: true, 
        message: `Error subscribing to plan: ${error.message}. Please try again.`, 
        type: 'error' 
      });
    } finally {
      setSubscribing(null);
    }
  };

  const hideNotification = () => {
    setNotification({ show: false, message: '', type: 'success' });
  };

  const filteredPlans = selectedCategory === 'all' 
    ? plans 
    : plans.filter(plan => plan.type === selectedCategory);

  const categories = [
    { value: 'all', label: 'All Plans' },
    { value: 'fiber', label: 'Fiber Plans' },
    { value: 'copper', label: 'Copper Plans' },
    { value: 'business', label: 'Business Plans' }
  ];

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}>⏳</div>
        <p>Loading plans...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Choose Your Perfect Plan</h1>
        <p style={subtitleStyle}>
          Find the right internet plan for your needs with our flexible options
        </p>
      </div>

      {/* Category Filter */}
      <div style={filterSectionStyle}>
        <div style={filterContainerStyle}>
          {categories.map(category => (
            <button
              key={category.value}
              style={{
                ...filterButtonStyle,
                ...(selectedCategory === category.value ? activeFilterStyle : {})
              }}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div style={plansContainerStyle}>
        {appliedOffer && (
          <div style={offerBannerStyle}>
            <div style={offerInfoStyle}>
              <span style={offerBadgeStyle}>{appliedOffer.badge}</span>
              <span style={offerTextStyle}>{appliedOffer.title} Applied!</span>
            </div>
            <button onClick={removeOffer} style={removeOfferStyle}>×</button>
          </div>
        )}
        <div style={plansGridStyle}>
          {filteredPlans.map((plan) => {
            const originalPrice = plan.price;
            const discountedPrice = calculateDiscountedPrice(originalPrice, appliedOffer);
            const hasDiscount = appliedOffer && discountedPrice < originalPrice;
            
            return (
              <div key={plan.id} style={planCardStyle}>
              {plan.popular && (
                <div style={popularBadgeStyle}>Most Popular</div>
              )}
              <div style={planHeaderStyle}>
                <h3 style={planNameStyle}>{plan.name}</h3>
                <div style={priceContainerStyle}>
                  {hasDiscount ? (
                    <>
                      <span style={originalPriceStyle}>${originalPrice.toFixed(2)}</span>
                      <span style={discountedPriceStyle}>${discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span style={priceStyle}>${originalPrice}</span>
                  )}
                  <span style={periodStyle}>/month</span>
                </div>
              </div>
              <p style={planDescStyle}>{plan.description}</p>
              <div style={speedInfoStyle}>
                <div style={speedItemStyle}>
                  <span style={speedLabelStyle}>Download</span>
                  <span style={speedValueStyle}>{plan.downloadSpeed} Mbps</span>
                </div>
                <div style={speedItemStyle}>
                  <span style={speedLabelStyle}>Upload</span>
                  <span style={speedValueStyle}>{plan.uploadSpeed} Mbps</span>
                </div>
              </div>
              <ul style={featuresListStyle}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={featureItemStyle}>
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <div style={planActionsStyle}>
                <button 
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={subscribing === plan.id}
                  style={{
                    ...selectButtonStyle,
                    ...(plan.popular ? popularButtonStyle : {}),
                    ...(subscribing === plan.id ? { opacity: 0.7, cursor: 'not-allowed' } : {}),
                    border: 'none',
                    cursor: subscribing === plan.id ? 'not-allowed' : 'pointer'
                  }}
                >
                  {subscribing === plan.id ? 'Subscribing...' : 'Select Plan'}
                </button>
                <button 
                  onClick={() => {
                    const planDetails = `Plan: ${plan.name}\nPrice: $${plan.price}/month\nDownload: ${plan.downloadSpeed} Mbps\nUpload: ${plan.uploadSpeed} Mbps\nFeatures: ${plan.features.join(', ')}`;
                    alert(planDetails);
                  }}
                  style={{
                    ...detailsLinkStyle,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation CTA */}
      <div style={ctaSectionStyle}>
        <div style={ctaContentStyle}>
          <h2 style={ctaTitleStyle}>Not sure which plan is right for you?</h2>
          <p style={ctaDescStyle}>
            Let our AI analyze your usage patterns and recommend the perfect plan
          </p>
          <Link to="/recommendations" style={ctaButtonStyle}>
            🤖 Get AI Recommendations
          </Link>
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxWidth: '400px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{notification.message}</span>
            <button 
              onClick={hideNotification}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.2rem',
                cursor: 'pointer',
                marginLeft: '1rem'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc'
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  fontSize: '1.2rem',
  color: '#64748b'
};

const spinnerStyle = {
  fontSize: '2rem',
  marginBottom: '1rem'
};

const headerStyle = {
  backgroundColor: 'white',
  padding: '4rem 0 2rem 0',
  textAlign: 'center',
  borderBottom: '1px solid #e2e8f0'
};

const titleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  maxWidth: '600px',
  margin: '0 auto'
};

const filterSectionStyle = {
  backgroundColor: 'white',
  padding: '2rem 0',
  borderBottom: '1px solid #e2e8f0'
};

const filterContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  gap: '1rem',
  flexWrap: 'wrap',
  padding: '0 2rem'
};

const filterButtonStyle = {
  padding: '0.75rem 1.5rem',
  border: '2px solid #e2e8f0',
  backgroundColor: 'white',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500',
  color: '#64748b',
  transition: 'all 0.3s'
};

const activeFilterStyle = {
  backgroundColor: '#1e3a8a',
  borderColor: '#1e3a8a',
  color: 'white'
};

const plansContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '4rem 2rem'
};

const plansGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '2rem'
};

const planCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0',
  position: 'relative',
  transition: 'transform 0.3s, box-shadow 0.3s'
};

const popularBadgeStyle = {
  position: 'absolute',
  top: '-10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#f59e0b',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: 'bold'
};

const planHeaderStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const planNameStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};


const discountedPriceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#10b981'
};

const priceContainerStyle = {
  marginBottom: '1rem'
};

const periodStyle = {
  color: '#64748b',
  fontSize: '0.9rem',
  marginLeft: '0.25rem'
};


const planDescStyle = {
  color: '#64748b',
  lineHeight: '1.5'
};

const speedInfoStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#f8fafc',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem'
};

const speedItemStyle = {
  textAlign: 'center'
};

const speedLabelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '0.25rem'
};

const speedValueStyle = {
  display: 'block',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#1e3a8a'
};

const featuresListStyle = {
  listStyle: 'none',
  padding: '0',
  marginBottom: '2rem'
};

const featureItemStyle = {
  padding: '0.5rem 0',
  color: '#374151',
  borderBottom: '1px solid #f3f4f6'
};

const planActionsStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const selectButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  textAlign: 'center',
  transition: 'background-color 0.3s'
};

const popularButtonStyle = {
  backgroundColor: '#f59e0b'
};

const detailsLinkStyle = {
  color: '#1e3a8a',
  textDecoration: 'none',
  textAlign: 'center',
  fontWeight: '500'
};

const ctaSectionStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '4rem 0'
};

const ctaContentStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'center',
  padding: '0 2rem'
};

const ctaTitleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '1rem'
};

const ctaDescStyle = {
  fontSize: '1.1rem',
  marginBottom: '2rem',
  opacity: 0.9
};

const ctaButtonStyle = {
  backgroundColor: 'white',
  color: '#1e3a8a',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'inline-block',
  transition: 'transform 0.2s'
};

const priceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#374151'
};

const offerBannerStyle = {
  backgroundColor: '#10b981',
  color: 'white',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const offerInfoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem'
};

const offerBadgeStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.8rem',
  fontWeight: 'bold'
};

const offerTextStyle = {
  fontWeight: 'bold'
};

const removeOfferStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  fontSize: '1.5rem',
  cursor: 'pointer',
  padding: '0.25rem 0.5rem',
  borderRadius: '4px'
};

const originalPriceStyle = {
  fontSize: '1.5rem',
  color: '#9ca3af',
  textDecoration: 'line-through',
  marginRight: '0.5rem'
};

export default Plans;
