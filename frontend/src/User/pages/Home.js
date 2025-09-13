import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            🌐 Welcome to Lumen Broadband
          </h1>
          <p style={heroSubtitleStyle}>
            AI-Powered Subscription Management for Modern Connectivity
          </p>
          <p style={heroDescStyle}>
            Experience lightning-fast internet with our intelligent platform that learns your usage patterns 
            and recommends the perfect plan for your needs.
          </p>
          <div style={heroButtonsStyle}>
            <Link to="/plans" style={primaryButtonStyle}>
              View Plans
            </Link>
            <Link to="/recommendations" style={secondaryButtonStyle}>
              🤖 Get AI Recommendations
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={featuresStyle}>
        <div style={sectionContentStyle}>
          <h2 style={sectionTitleStyle}>Why Choose Lumen Broadband?</h2>
          <div style={featuresGridStyle}>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>⚡</div>
              <h3 style={featureHeadingStyle}>Lightning Fast</h3>
              <p style={featureTextStyle}>
                Up to 1 Gbps speeds with our fiber-optic network
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🤖</div>
              <h3 style={featureHeadingStyle}>AI-Powered</h3>
              <p style={featureTextStyle}>
                Smart recommendations based on your usage patterns
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>💰</div>
              <h3 style={featureHeadingStyle}>Best Value</h3>
              <p style={featureTextStyle}>
                Competitive pricing with no hidden fees
              </p>
            </div>
            <div style={featureCardStyle}>
              <div style={featureIconStyle}>🔧</div>
              <h3 style={featureHeadingStyle}>24/7 Support</h3>
              <p style={featureTextStyle}>
                Round-the-clock technical support when you need it
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Plans Preview */}
      <section style={plansPreviewStyle}>
        <div style={sectionContentStyle}>
          <h2 style={sectionTitleStyle}>Popular Plans</h2>
          <div style={plansGridStyle}>
            <div style={planCardStyle}>
              <h3 style={planNameStyle}>Basic Fiber</h3>
              <div style={planPriceStyle}>$39.99<span style={planPeriodStyle}>/month</span></div>
              <ul style={planFeaturesStyle}>
                <li>100 Mbps Download</li>
                <li>20 Mbps Upload</li>
                <li>Unlimited Data</li>
                <li>Free Installation</li>
              </ul>
              <Link to="/plans" style={planButtonStyle}>Choose Plan</Link>
            </div>
            <div style={planCardStyle}>
              <h3 style={planNameStyle}>Premium Fiber</h3>
              <div style={planPriceStyle}>$59.99<span style={planPeriodStyle}>/month</span></div>
              <ul style={planFeaturesStyle}>
                <li>500 Mbps Download</li>
                <li>100 Mbps Upload</li>
                <li>Unlimited Data</li>
                <li>Free Router</li>
              </ul>
              <Link to="/plans" style={planButtonStyle}>Choose Plan</Link>
            </div>
            <div style={planCardStyle}>
              <h3 style={planNameStyle}>Ultra Fiber</h3>
              <div style={planPriceStyle}>$89.99<span style={planPeriodStyle}>/month</span></div>
              <ul style={planFeaturesStyle}>
                <li>1 Gbps Download</li>
                <li>500 Mbps Upload</li>
                <li>Unlimited Data</li>
                <li>Priority Support</li>
              </ul>
              <Link to="/plans" style={planButtonStyle}>Choose Plan</Link>
            </div>
          </div>
          <div style={viewAllStyle}>
            <Link to="/plans" style={viewAllButtonStyle}>View All Plans</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh'
};

const heroStyle = {
  background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  color: 'white',
  padding: '4rem 0',
  textAlign: 'center'
};

const heroContentStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 2rem'
};

const heroTitleStyle = {
  fontSize: '3rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  lineHeight: '1.2'
};

const heroSubtitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  opacity: '0.9'
};

const heroDescStyle = {
  fontSize: '1.1rem',
  marginBottom: '2rem',
  opacity: '0.8',
  lineHeight: '1.6'
};

const heroButtonsStyle = {
  display: 'flex',
  gap: '1rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const primaryButtonStyle = {
  backgroundColor: '#ffffff',
  color: '#1e3a8a',
  padding: '1rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'transform 0.3s'
};

const secondaryButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  padding: '1rem 2rem',
  border: '2px solid white',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s'
};

const featuresStyle = {
  padding: '4rem 0',
  backgroundColor: 'white'
};

const sectionContentStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem'
};

const sectionTitleStyle = {
  fontSize: '2.5rem',
  textAlign: 'center',
  marginBottom: '3rem',
  color: '#1e3a8a'
};

const featuresGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '2rem'
};

const featureCardStyle = {
  textAlign: 'center',
  padding: '2rem',
  borderRadius: '12px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0'
};

const featureIconStyle = {
  fontSize: '3rem',
  marginBottom: '1rem'
};

const featureHeadingStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#1e3a8a'
};

const featureTextStyle = {
  color: '#64748b',
  lineHeight: '1.6'
};

const plansPreviewStyle = {
  padding: '4rem 0',
  backgroundColor: '#f8fafc'
};

const plansGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '2rem',
  marginBottom: '3rem'
};

const planCardStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '1px solid #e2e8f0'
};

const planNameStyle = {
  fontSize: '1.5rem',
  marginBottom: '1rem',
  color: '#1e3a8a'
};

const planPriceStyle = {
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '1.5rem'
};

const planPeriodStyle = {
  fontSize: '1rem',
  fontWeight: 'normal',
  color: '#64748b'
};

const planFeaturesStyle = {
  listStyle: 'none',
  padding: '0',
  marginBottom: '2rem'
};

const planButtonStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.75rem 2rem',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'inline-block',
  transition: 'background-color 0.3s'
};

const viewAllStyle = {
  textAlign: 'center'
};

const viewAllButtonStyle = {
  backgroundColor: 'transparent',
  color: '#1e3a8a',
  padding: '1rem 2rem',
  border: '2px solid #1e3a8a',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'all 0.3s'
};

export default Home;
