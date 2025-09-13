// Track current offers and promotions

import React from 'react';
import { Link } from 'react-router-dom';

const Discounts = () => {
  const offers = [
    {
      id: 1,
      title: 'New Customer Special',
      discount: '50% OFF',
      description: 'First 3 months at half price',
      validUntil: '2025-03-31'
    },
    {
      id: 2,
      title: 'Upgrade Bonus',
      discount: 'FREE Router',
      description: 'Free premium router with fiber upgrade',
      validUntil: '2025-02-28'
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Special Offers</h1>
        <p style={subtitleStyle}>Save money with our current promotions</p>
      </div>
      
      <div style={offersGridStyle}>
        {offers.map(offer => (
          <div key={offer.id} style={offerCardStyle}>
            <div style={discountBadgeStyle}>{offer.discount}</div>
            <h3 style={offerTitleStyle}>{offer.title}</h3>
            <p style={offerDescStyle}>{offer.description}</p>
            <p style={validUntilStyle}>Valid until: {offer.validUntil}</p>
            <Link to="/plans" style={claimButtonStyle}>View Plans</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  padding: '2rem'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '3rem'
};

const titleStyle = {
  fontSize: '2.5rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const subtitleStyle = {
  fontSize: '1.2rem',
  color: '#64748b'
};

const offersGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  maxWidth: '1200px',
  margin: '0 auto'
};

const offerCardStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  position: 'relative'
};

const discountBadgeStyle = {
  backgroundColor: '#f59e0b',
  color: 'white',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  display: 'inline-block',
  marginBottom: '1rem'
};

const offerTitleStyle = {
  fontSize: '1.5rem',
  color: '#1e3a8a',
  marginBottom: '1rem'
};

const offerDescStyle = {
  color: '#64748b',
  marginBottom: '1rem'
};

const validUntilStyle = {
  fontSize: '0.9rem',
  color: '#ef4444',
  marginBottom: '2rem'
};

const claimButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold'
};

export default Discounts;
