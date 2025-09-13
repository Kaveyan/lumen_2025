// Upgrade/downgrade subscription flow

import React from 'react';
import { Link } from 'react-router-dom';

const UpgradeDowngrade = () => {
  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Upgrade/Downgrade Plan</h1>
        <p style={descStyle}>Manage your subscription plan changes</p>
        <Link to="/plans" style={buttonStyle}>Browse Plans</Link>
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

const buttonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default UpgradeDowngrade;
