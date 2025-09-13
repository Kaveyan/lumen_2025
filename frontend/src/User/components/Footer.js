import React from 'react';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div>
            <h4 style={headingStyle}>🌐 Lumen Broadband</h4>
            <p style={textStyle}>AI-Powered Subscription Management</p>
          </div>
          <div>
            <p style={textStyle}>© 2025 Lumen Broadband. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '2rem 0',
  marginTop: 'auto'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 2rem'
};

const contentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const headingStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '1.2rem'
};

const textStyle = {
  margin: '0',
  opacity: '0.8'
};

export default Footer;
