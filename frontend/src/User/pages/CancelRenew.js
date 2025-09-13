import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CancelRenew = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isAutoRenew, setAutoRenew] = useState(true);

  // Mock data that would come from an API
  const mockSubscription = {
    planName: 'Premium Fiber',
    price: 59.99,
    status: 'active',
    nextBilling: '2025-02-15',
  };

  useEffect(() => {
    // Simulate fetching subscription details
    setLoading(true);
    setTimeout(() => {
      setSubscription(mockSubscription);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleConfirmCancel = () => {
    // In a real app, this would trigger an API call
    console.log('Subscription cancellation confirmed.');
    setShowModal(false);
    alert('Your subscription has been cancelled.');
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={cardStyle}>Loading subscription details...</div>
      </div>
    );
  }
  
  return (
    <>
      <div style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Manage Subscription</h1>
          <p style={descStyle}>Manage your plan settings and cancellation options below.</p>

          <div style={detailsContainerStyle}>
            <div style={detailItemStyle}>
              <span>Plan</span>
              <strong>{subscription.planName}</strong>
            </div>
            <div style={detailItemStyle}>
              <span>Next Billing Date</span>
              <strong>{formatDate(subscription.nextBilling)}</strong>
            </div>
            <div style={detailItemStyle}>
              <span>Monthly Price</span>
              <strong>${subscription.price}</strong>
            </div>
          </div>

          <div style={autoRenewContainerStyle}>
            <p>Auto-Renewal is <strong>{isAutoRenew ? 'ON' : 'OFF'}</strong></p>
            <button
              onClick={() => setAutoRenew(!isAutoRenew)}
              style={toggleButtonStyle}
            >
              {isAutoRenew ? 'Turn Off Auto-Renewal' : 'Turn On Auto-Renewal'}
            </button>
          </div>
          
          <div style={cancelSectionStyle}>
            <p style={cancelDescStyle}>
              If you cancel, your plan will remain active until {formatDate(subscription.nextBilling)}.
            </p>
            <button 
              onClick={() => setShowModal(true)} 
              style={cancelButtonStyle}
            >
              Cancel Subscription
            </button>
          </div>

          <Link to="/my-subscriptions" style={backLinkStyle}>
            &larr; Back to My Subscriptions
          </Link>
        </div>
      </div>

      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={modalTitleStyle}>Are you sure?</h2>
            <p style={modalTextStyle}>
              You are about to cancel your <strong>{subscription.planName}</strong> plan. 
              Your service will continue until the end of your billing period on {formatDate(subscription.nextBilling)}.
            </p>
            <div style={modalActionsStyle}>
              <button onClick={() => setShowModal(false)} style={modalSecondaryButtonStyle}>
                Keep Subscription
              </button>
              <button onClick={handleConfirmCancel} style={modalPrimaryButtonStyle}>
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- Styles ---

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '12px',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  maxWidth: '600px',
  width: '100%',
};

const titleStyle = {
  fontSize: '2rem',
  color: '#1e3a8a',
  marginBottom: '0.5rem',
};

const descStyle = {
  color: '#64748b',
  marginBottom: '2.5rem',
};

const detailsContainerStyle = {
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '1.5rem',
  marginBottom: '2rem',
  textAlign: 'left',
};

const detailItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.75rem 0',
  borderBottom: '1px solid #f1f5f9',
  color: '#374151',
};

detailItemStyle[':last-child'] = {
  borderBottom: 'none',
};

const autoRenewContainerStyle = {
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
  padding: '1.5rem',
  marginBottom: '2rem',
};

const toggleButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '0.5rem',
};

const cancelSectionStyle = {
  borderTop: '1px solid #e2e8f0',
  paddingTop: '2rem',
  marginBottom: '2rem',
};

const cancelDescStyle = {
  color: '#64748b',
  marginBottom: '1rem',
};

const cancelButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
  width: '100%',
};

const backLinkStyle = {
  color: '#1e3a8a',
  textDecoration: 'none',
  fontWeight: '600',
};

// --- Modal Styles ---

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  maxWidth: '500px',
  textAlign: 'center',
  margin: '1rem',
};

const modalTitleStyle = {
  fontSize: '1.5rem',
  color: '#1e3a8a',
  marginBottom: '1rem',
};

const modalTextStyle = {
  color: '#475569',
  marginBottom: '2rem',
  lineHeight: '1.6',
};

const modalActionsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
};

const modalPrimaryButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const modalSecondaryButtonStyle = {
  backgroundColor: '#e2e8f0',
  color: '#374151',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

export default CancelRenew;

