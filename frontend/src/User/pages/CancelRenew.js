import React from 'react';
import { Link } from 'react-router-dom';

const CancelRenew = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Manage Subscription</h1>
        <p style={descStyle}>Cancel or renew your subscription</p>
        <div style={actionsStyle}>
          <button style={renewButtonStyle}>Renew Subscription</button>
          <button style={cancelButtonStyle}>Cancel Subscription</button>
        </div>
        <Link to="/my-subscriptions" style={backLinkStyle}>Back to My Subscriptions</Link>
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const cardStyle = {
  backgroundColor: 'white',
  padding: '3rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  maxWidth: '500px'
};

const titleStyle = {
  fontSize: '2rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const descStyle = {
  color: '#64748b',
  marginBottom: '2rem'
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '2rem',
  justifyContent: 'center'
};

const renewButtonStyle = {
  backgroundColor: '#10b981',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cancelButtonStyle = {
  backgroundColor: '#ef4444',
  color: 'white',
  padding: '1rem 2rem',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const backLinkStyle = {
  color: '#1e3a8a',
  textDecoration: 'none'
};

export default CancelRenew;
