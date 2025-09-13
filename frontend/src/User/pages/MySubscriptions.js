import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Mock subscriptions data
  const mockSubscriptions = [
    {
      id: 1,
      planName: 'Premium Fiber',
      status: 'active',
      price: 59.99,
      downloadSpeed: 500,
      uploadSpeed: 100,
      startDate: '2024-01-15',
      nextBilling: '2025-02-15',
      features: ['Unlimited Data', 'Free Router', 'Priority Support'],
      usageThisMonth: {
        download: 450, // GB
        upload: 120,
        totalAllowed: 'unlimited'
      }
    }
  ];

  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'suspended': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div style={spinnerStyle}>⏳</div>
        <p>Loading your subscriptions...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>My Subscriptions</h1>
        {user && (
          <p style={welcomeStyle}>Welcome back, {user.name}!</p>
        )}
      </div>

      {subscriptions.length === 0 ? (
        <div style={emptyStateStyle}>
          <div style={emptyIconStyle}>📡</div>
          <h2 style={emptyTitleStyle}>No Active Subscriptions</h2>
          <p style={emptyDescStyle}>
            You don't have any active subscriptions yet. Browse our plans to get started.
          </p>
          <Link to="/plans" style={emptyButtonStyle}>
            Browse Plans
          </Link>
        </div>
      ) : (
        <div style={subscriptionsContainerStyle}>
          {subscriptions.map(subscription => (
            <div key={subscription.id} style={subscriptionCardStyle}>
              <div style={cardHeaderStyle}>
                <div>
                  <h3 style={planNameStyle}>{subscription.planName}</h3>
                  <div style={statusContainerStyle}>
                    <span 
                      style={{
                        ...statusBadgeStyle,
                        backgroundColor: getStatusColor(subscription.status)
                      }}
                    >
                      {subscription.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div style={priceContainerStyle}>
                  <span style={priceStyle}>${subscription.price}</span>
                  <span style={periodStyle}>/month</span>
                </div>
              </div>

              <div style={speedInfoStyle}>
                <div style={speedItemStyle}>
                  <span style={speedLabelStyle}>Download</span>
                  <span style={speedValueStyle}>{subscription.downloadSpeed} Mbps</span>
                </div>
                <div style={speedItemStyle}>
                  <span style={speedLabelStyle}>Upload</span>
                  <span style={speedValueStyle}>{subscription.uploadSpeed} Mbps</span>
                </div>
              </div>

              <div style={usageContainerStyle}>
                <h4 style={usageTitleStyle}>This Month's Usage</h4>
                <div style={usageStatsStyle}>
                  <div style={usageItemStyle}>
                    <span style={usageLabelStyle}>Downloaded</span>
                    <span style={usageValueStyle}>{subscription.usageThisMonth.download} GB</span>
                  </div>
                  <div style={usageItemStyle}>
                    <span style={usageLabelStyle}>Uploaded</span>
                    <span style={usageValueStyle}>{subscription.usageThisMonth.upload} GB</span>
                  </div>
                </div>
              </div>

              <div style={detailsContainerStyle}>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Start Date:</span>
                  <span style={detailValueStyle}>{formatDate(subscription.startDate)}</span>
                </div>
                <div style={detailItemStyle}>
                  <span style={detailLabelStyle}>Next Billing:</span>
                  <span style={detailValueStyle}>{formatDate(subscription.nextBilling)}</span>
                </div>
              </div>

              <div style={featuresContainerStyle}>
                <h4 style={featuresTitleStyle}>Plan Features</h4>
                <ul style={featuresListStyle}>
                  {subscription.features.map((feature, index) => (
                    <li key={index} style={featureItemStyle}>
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={actionsContainerStyle}>
                <Link to="/upgrade-downgrade" style={primaryActionStyle}>
                  Upgrade/Downgrade
                </Link>
                <Link to="/cancel-renew" style={secondaryActionStyle}>
                  Manage Subscription
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={quickActionsStyle}>
        <h2 style={quickActionsTitleStyle}>Quick Actions</h2>
        <div style={quickActionsGridStyle}>
          <Link to="/recommendations" style={quickActionCardStyle}>
            <div style={quickActionIconStyle}>🤖</div>
            <h3 style={quickActionTitleStyle}>AI Recommendations</h3>
            <p style={quickActionDescStyle}>Get personalized plan suggestions</p>
          </Link>
          <Link to="/plans" style={quickActionCardStyle}>
            <div style={quickActionIconStyle}>📋</div>
            <h3 style={quickActionTitleStyle}>Browse Plans</h3>
            <p style={quickActionDescStyle}>Explore all available plans</p>
          </Link>
          <Link to="/discounts" style={quickActionCardStyle}>
            <div style={quickActionIconStyle}>💰</div>
            <h3 style={quickActionTitleStyle}>Special Offers</h3>
            <p style={quickActionDescStyle}>Check current promotions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '2rem'
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
  maxWidth: '1200px',
  margin: '0 auto 2rem auto'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '0.5rem'
};

const welcomeStyle = {
  fontSize: '1.1rem',
  color: '#64748b'
};

const emptyStateStyle = {
  textAlign: 'center',
  padding: '4rem 2rem',
  maxWidth: '600px',
  margin: '0 auto'
};

const emptyIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem'
};

const emptyTitleStyle = {
  fontSize: '1.5rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const emptyDescStyle = {
  color: '#64748b',
  marginBottom: '2rem',
  lineHeight: '1.6'
};

const emptyButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'inline-block'
};

const subscriptionsContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'grid',
  gap: '2rem'
};

const subscriptionCardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0'
};

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '2rem'
};

const planNameStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '0.5rem'
};

const statusContainerStyle = {
  marginTop: '0.5rem'
};

const statusBadgeStyle = {
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 'bold'
};

const priceContainerStyle = {
  textAlign: 'right'
};

const priceStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#1e3a8a'
};

const periodStyle = {
  fontSize: '1rem',
  color: '#64748b'
};

const speedInfoStyle = {
  display: 'flex',
  gap: '2rem',
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

const usageContainerStyle = {
  marginBottom: '2rem'
};

const usageTitleStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '1rem'
};

const usageStatsStyle = {
  display: 'flex',
  gap: '2rem'
};

const usageItemStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const usageLabelStyle = {
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '0.25rem'
};

const usageValueStyle = {
  fontSize: '1.125rem',
  fontWeight: 'bold',
  color: '#1e3a8a'
};

const detailsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
  marginBottom: '2rem'
};

const detailItemStyle = {
  display: 'flex',
  justifyContent: 'space-between'
};

const detailLabelStyle = {
  color: '#64748b',
  fontWeight: '500'
};

const detailValueStyle = {
  color: '#374151',
  fontWeight: 'bold'
};

const featuresContainerStyle = {
  marginBottom: '2rem'
};

const featuresTitleStyle = {
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#374151',
  marginBottom: '1rem'
};

const featuresListStyle = {
  listStyle: 'none',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '0.5rem'
};

const featureItemStyle = {
  color: '#374151',
  fontSize: '0.875rem'
};

const actionsContainerStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap'
};

const primaryActionStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  textAlign: 'center',
  flex: '1',
  minWidth: '200px'
};

const secondaryActionStyle = {
  backgroundColor: 'transparent',
  color: '#1e3a8a',
  padding: '0.75rem 1.5rem',
  border: '2px solid #1e3a8a',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  textAlign: 'center',
  flex: '1',
  minWidth: '200px'
};

const quickActionsStyle = {
  maxWidth: '1200px',
  margin: '4rem auto 0 auto'
};

const quickActionsTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '2rem'
};

const quickActionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem'
};

const quickActionCardStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center',
  textDecoration: 'none',
  border: '1px solid #e2e8f0',
  transition: 'transform 0.3s, box-shadow 0.3s'
};

const quickActionIconStyle = {
  fontSize: '2.5rem',
  marginBottom: '1rem'
};

const quickActionTitleStyle = {
  fontSize: '1.125rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '0.5rem'
};

const quickActionDescStyle = {
  color: '#64748b',
  fontSize: '0.875rem'
};

export default MySubscriptions;
