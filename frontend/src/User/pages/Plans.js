// Browse all available plans

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock plans data (in real app, this would come from backend)
  const mockPlans = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 6,
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

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPlans(mockPlans);
      setLoading(false);
    }, 1000);
  }, []);

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
        <div style={plansGridStyle}>
          {filteredPlans.map(plan => (
            <div key={plan.id} style={planCardStyle}>
              {plan.popular && (
                <div style={popularBadgeStyle}>Most Popular</div>
              )}
              
              <div style={planHeaderStyle}>
                <h3 style={planNameStyle}>{plan.name}</h3>
                <div style={planPriceStyle}>
                  ${plan.price}
                  <span style={planPeriodStyle}>/month</span>
                </div>
                <p style={planDescStyle}>{plan.description}</p>
              </div>

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
                <Link 
                  to={`/plans/${plan.id}`} 
                  style={{
                    ...selectButtonStyle,
                    ...(plan.popular ? popularButtonStyle : {})
                  }}
                >
                  Select Plan
                </Link>
                <Link to={`/plans/${plan.id}`} style={detailsLinkStyle}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
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

const planPriceStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const planPeriodStyle = {
  fontSize: '1rem',
  fontWeight: 'normal',
  color: '#64748b'
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
  opacity: '0.9'
};

const ctaButtonStyle = {
  backgroundColor: 'white',
  color: '#1e3a8a',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  display: 'inline-block',
  transition: 'transform 0.3s'
};

export default Plans;
