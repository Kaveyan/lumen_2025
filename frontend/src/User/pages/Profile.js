import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div style={containerStyle}>
      <div style={profileCardStyle}>
        <h1 style={titleStyle}>My Profile</h1>
        <div style={infoStyle}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account Type:</strong> {user.userType}</p>
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

const profileCardStyle = {
  backgroundColor: 'white',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  maxWidth: '500px',
  width: '100%'
};

const titleStyle = {
  fontSize: '2rem',
  color: '#1e3a8a',
  marginBottom: '2rem',
  textAlign: 'center'
};

const infoStyle = {
  fontSize: '1.1rem',
  lineHeight: '2'
};

const loadingStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  fontSize: '1.2rem'
};

export default Profile;
