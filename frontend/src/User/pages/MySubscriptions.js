import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import subscriptionService from '../../services/subscriptionService';

const UpgradeDowngrade = () => {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [availablePlans, setAvailablePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [switching, setSwitching] = useState(false);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [plansResponse, subscriptionResponse] = await Promise.all([
        subscriptionService.getAvailablePlans(),
        subscriptionService.getCurrentSubscription()
      ]);
      
      if (plansResponse.success) {
        setAvailablePlans(plansResponse.plans);
      }
      
      if (subscriptionResponse.success && subscriptionResponse.subscription) {
        setCurrentSubscription(subscriptionResponse.subscription);
      } else {
        // No active subscription, redirect to home
        navigate('/');
        return;
      }
    } catch (err) {
      setError('Failed to load subscription data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectPlan = async (plan) => {
    if (!currentSubscription || switching) return;
    
    try {
      setSwitching(true);
      const isUpgrade = plan.price > currentSubscription.price;
      
      let response;
      if (isUpgrade) {
        response = await subscriptionService.upgradeSubscription(plan.id);
      } else {
        response = await subscriptionService.downgradeSubscription(plan.id);
      }
      
      if (response.success) {
        alert(response.message);
        await loadData(); // Refresh data
      }
    } catch (err) {
      alert(`Failed to switch plan: ${err.message}`);
    } finally {
      setSwitching(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription || switching) return;
    
    const reason = prompt('Please provide a reason for cancellation (optional):');
    if (reason === null) return; // User clicked cancel
    
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel your ${currentSubscription.planName} subscription? This action cannot be undone.`
    );
    
    if (!confirmCancel) return;
    
    try {
      setSwitching(true);
      const response = await subscriptionService.cancelSubscription(reason);
      
      if (response.success) {
        alert(response.message);
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      alert(`Failed to cancel subscription: ${err.message}`);
    } finally {
      setSwitching(false);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}>⏳</div>
          <p>Loading plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={pageWrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Change Your Plan</h1>
          {error && (
            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
              {error}
            </div>
          )}
          <p style={descStyle}>
            You are currently on the <strong>{currentSubscription?.planName}</strong> plan.
            Choose a new plan below.
          </p>
        </div>

        <div style={plansContainerStyle}>
          {availablePlans.map((plan) => {
            const isCurrentPlan = plan.id === currentSubscription?.planId;
            const isUpgrade = plan.price > (currentSubscription?.price || 0);

            return (
              <div
                key={plan.id}
                style={{
                  ...planCardStyle,
                  borderColor: isCurrentPlan ? '#1e3a8a' : '#e2e8f0',
                  transform: isCurrentPlan ? 'scale(1.02)' : 'none',
                }}
              >
                {isCurrentPlan && <div style={currentPlanBadgeStyle}>Current Plan</div>}
                {!isCurrentPlan && (
                  <div
                    style={{
                      ...planTagStyle,
                      backgroundColor: isUpgrade ? '#10b981' : '#f59e0b',
                    }}
                  >
                    {isUpgrade ? 'Upgrade' : 'Downgrade'}
                  </div>
                )}
                <h3 style={planNameStyle}>{plan.name}</h3>
                <div style={priceContainerStyle}>
                  <span style={priceStyle}>${plan.price}</span>
                  <span style={periodStyle}>/month</span>
                </div>
                <div style={speedInfoStyle}>
                  <span>↓ {plan.downloadSpeed} Mbps</span>
                  <span>↑ {plan.uploadSpeed} Mbps</span>
                </div>
                <ul style={featuresListStyle}>
                  {plan.features.map((feature, index) => (
                    <li key={index} style={featureItemStyle}>✓ {feature}</li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isCurrentPlan || switching}
                  style={isCurrentPlan || switching ? disabledButtonStyle : buttonStyle}
                >
                  {isCurrentPlan ? 'Your Current Plan' : switching ? 'Processing...' : 'Switch to this Plan'}
                </button>
              </div>
            );
          })}
        </div>
         <div style={backLinkContainerStyle}>
          <button
            onClick={handleCancelSubscription}
            disabled={switching}
            style={cancelButtonStyle}
          >
            {switching ? 'Processing...' : 'Cancel My Subscription'}
          </button>
          <Link to="/my-subscriptions" style={backLinkStyle}>
            &larr; Back to My Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Styles ---

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '2rem',
};

const pageWrapperStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#64748b'
};

const spinnerStyle = {
  fontSize: '2rem',
  marginBottom: '1rem'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem',
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#1e3a8a',
  marginBottom: '0.5rem',
};

const descStyle = {
  color: '#64748b',
  fontSize: '1.1rem',
};

const plansContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
};

const planCardStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  border: '2px solid transparent',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const currentPlanBadgeStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
};

const planTagStyle = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  color: 'white',
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: 'bold',
};

const planNameStyle = {
  fontSize: '1.5rem',
  color: '#1e3a8a',
  marginBottom: '0.5rem',
  fontWeight: 'bold',
};

const priceContainerStyle = {
  marginBottom: '1.5rem',
};

const priceStyle = {
  fontSize: '2.25rem',
  fontWeight: 'bold',
  color: '#374151',
};

const periodStyle = {
  fontSize: '1rem',
  color: '#64748b',
  marginLeft: '0.25rem'
};

const speedInfoStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#f8fafc',
  padding: '0.75rem',
  borderRadius: '8px',
  marginBottom: '1.5rem',
  color: '#1e3a8a',
  fontWeight: '600',
};

const featuresListStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0 0 2rem 0',
  flexGrow: '1',
};

const featureItemStyle = {
  color: '#374151',
  marginBottom: '0.5rem',
};

const buttonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  textAlign: 'center',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#9ca3af',
  cursor: 'not-allowed',
};

const backLinkContainerStyle = {
    textAlign: 'center',
    marginTop: '3rem',
};

const backLinkStyle = {
    color: '#1e3a8a',
    textDecoration: 'none',
    fontWeight: '600',
};

const cancelButtonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
    '&:hover': {
        backgroundColor: '#b91c1c'
    },
    '&:disabled': {
        backgroundColor: '#9ca3af',
        cursor: 'not-allowed'
    }
};

export default UpgradeDowngrade;

