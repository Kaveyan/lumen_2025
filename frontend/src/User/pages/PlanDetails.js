import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PlanDetails = () => {
  const { id } = useParams();

  // Mock plan data - in real app, fetch from API
  const plan = {
    id: id,
    name: 'Premium Fiber',
    price: 59.99,
    downloadSpeed: 500,
    uploadSpeed: 100,
    description: 'Great for streaming, gaming, and medium-sized families',
    features: ['Unlimited Data', 'Free Router', 'Priority Support', '1 Year Contract']
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>{plan.name}</h1>
        <div style={priceStyle}>
          ${plan.price}<span style={periodStyle}>/month</span>
        </div>
        <p style={descStyle}>{plan.description}</p>
        
        <div style={speedInfoStyle}>
          <div>Download: {plan.downloadSpeed} Mbps</div>
          <div>Upload: {plan.uploadSpeed} Mbps</div>
        </div>

        <ul style={featuresStyle}>
          {plan.features.map((feature, index) => (
            <li key={index}>✓ {feature}</li>
          ))}
        </ul>

        <div style={actionsStyle}>
          <Link to="/plans" style={backButtonStyle}>Back to Plans</Link>
          <button style={selectButtonStyle}>Select This Plan</button>
        </div>
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
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const priceStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const periodStyle = {
  fontSize: '1.2rem',
  color: '#64748b'
};

const descStyle = {
  fontSize: '1.2rem',
  color: '#64748b',
  marginBottom: '2rem'
};

const speedInfoStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: '#f8fafc',
  padding: '1rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  fontSize: '1.1rem',
  fontWeight: 'bold'
};

const featuresStyle = {
  listStyle: 'none',
  padding: '0',
  marginBottom: '2rem',
  textAlign: 'left'
};

const actionsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center'
};

const backButtonStyle = {
  padding: '1rem 2rem',
  border: '2px solid #1e3a8a',
  color: '#1e3a8a',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 'bold'
};

const selectButtonStyle = {
  padding: '1rem 2rem',
  backgroundColor: '#1e3a8a',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default PlanDetails;
