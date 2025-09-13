import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          🌐 Lumen Broadband
        </Link>
        <div style={linksStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/plans" style={linkStyle}>Plans</Link>
          <Link to="/recommendations" style={linkStyle}>🤖 AI Recommendations</Link>
          <Link to="/my-subscriptions" style={linkStyle}>My Subscriptions</Link>
          <Link to="/discounts" style={linkStyle}>Offers</Link>
          <Link to="/login" style={linkStyle}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#1e3a8a',
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 2rem'
};

const logoStyle = {
  color: 'white',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textDecoration: 'none'
};

const linksStyle = {
  display: 'flex',
  gap: '2rem'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'background-color 0.3s'
};

export default Navbar;
