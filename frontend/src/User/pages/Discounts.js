// Track current offers and promotions

import React, { useState, useEffect } from 'react';
import subscriptionService from '../../services/subscriptionService';

const Discounts = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setLoading(true);
      const response = await subscriptionService.getActiveOffers();
      if (response.success) {
        setOffers(response.offers);
      } else {
        setError('Failed to load offers');
      }
    } catch (err) {
      console.error('Error loading offers:', err);
      setError('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const applyOffer = (offer) => {
    // Store the selected offer in localStorage for use in plans/checkout
    localStorage.setItem('selectedOffer', JSON.stringify(offer));
    
    // Show confirmation and redirect to plans
    alert(`${offer.title} applied! You'll see discounted prices on the plans page.`);
    
    // Redirect to plans page where discount will be applied
    window.location.href = '/plans';
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <div style={spinnerStyle}>⏳</div>
          <p>Loading offers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={errorStyle}>
          <p>{error}</p>
          <button onClick={loadOffers} style={retryButtonStyle}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Special Offers</h1>
        <p style={subtitleStyle}>Save money with our current promotions</p>
      </div>
      
      {offers.length === 0 ? (
        <div style={noOffersStyle}>
          <p>No active offers at the moment. Check back soon!</p>
        </div>
      ) : (
        <div style={offersGridStyle}>
          {offers.map(offer => {
            const validUntilDate = new Date(offer.validUntil).toLocaleDateString();
            return (
              <div key={offer._id} style={offerCardStyle}>
                <div style={discountBadgeStyle}>{offer.badge}</div>
                <h3 style={offerTitleStyle}>{offer.title}</h3>
                <p style={offerDescStyle}>{offer.description}</p>
                <p style={validUntilStyle}>Valid until: {validUntilDate}</p>
                {offer.terms && (
                  <p style={termsStyle}>{offer.terms}</p>
                )}
                <button 
                  onClick={() => applyOffer(offer)}
                  style={claimButtonStyle}
                >
                  Apply Offer
                </button>
              </div>
            );
          })}
        </div>
      )}
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
  fontWeight: 'bold',
  display: 'inline-block',
  transition: 'background-color 0.2s'
};

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '50vh',
  color: '#64748b'
};

const spinnerStyle = {
  fontSize: '2rem',
  marginBottom: '1rem'
};

const errorStyle = {
  textAlign: 'center',
  padding: '2rem',
  color: '#ef4444'
};

const retryButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  marginTop: '1rem'
};

const noOffersStyle = {
  textAlign: 'center',
  padding: '3rem',
  color: '#64748b',
  fontSize: '1.1rem'
};

const termsStyle = {
  fontSize: '0.8rem',
  color: '#64748b',
  fontStyle: 'italic',
  marginBottom: '1rem'
};

export default Discounts;
