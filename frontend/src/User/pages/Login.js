// Simple login component for both users and admins
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock authentication - in real app, this would call backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (formData.email === 'demo@lumen.com' && formData.password === 'demo123') {
        // Store user info in localStorage (in real app, use proper auth tokens)
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          userType: formData.userType,
          name: 'Demo User'
        }));
        
        // Redirect based on user type
        if (formData.userType === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/my-subscriptions');
        }
      } else {
        setError('Invalid email or password. Try demo@lumen.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={loginBoxStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={subtitleStyle}>Sign in to your Lumen Broadband account</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>User Type</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="user">Customer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={inputStyle}
              required
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...submitButtonStyle,
              ...(loading ? disabledButtonStyle : {})
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div style={linksStyle}>
            <Link to="/forgot-password" style={linkStyle}>
              Forgot your password?
            </Link>
          </div>
        </form>

        <div style={dividerStyle}>
          <span style={dividerTextStyle}>Don't have an account?</span>
        </div>

        <Link to="/register" style={registerButtonStyle}>
          Create New Account
        </Link>

        <div style={demoInfoStyle}>
          <h4 style={demoTitleStyle}>Demo Credentials</h4>
          <p style={demoTextStyle}>
            <strong>Email:</strong> demo@lumen.com<br/>
            <strong>Password:</strong> demo123
          </p>
          <p style={demoNoteStyle}>
            Try both Customer and Administrator login types
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  minHeight: '100vh',
  backgroundColor: '#f8fafc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem'
};

const loginBoxStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  padding: '3rem',
  width: '100%',
  maxWidth: '450px'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#1e3a8a',
  marginBottom: '0.5rem'
};

const subtitleStyle = {
  color: '#64748b',
  fontSize: '1rem'
};

const formStyle = {
  marginBottom: '2rem'
};

const errorStyle = {
  backgroundColor: '#fef2f2',
  border: '1px solid #fecaca',
  color: '#dc2626',
  padding: '0.75rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  fontSize: '0.875rem'
};

const fieldGroupStyle = {
  marginBottom: '1.5rem'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: '#374151',
  marginBottom: '0.5rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'border-color 0.3s',
  boxSizing: 'border-box'
};

const selectStyle = {
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  fontSize: '1rem',
  backgroundColor: 'white',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  width: '100%',
  backgroundColor: '#1e3a8a',
  color: 'white',
  padding: '0.75rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'background-color 0.3s'
};

const disabledButtonStyle = {
  backgroundColor: '#9ca3af',
  cursor: 'not-allowed'
};

const linksStyle = {
  textAlign: 'center',
  marginTop: '1rem'
};

const linkStyle = {
  color: '#1e3a8a',
  textDecoration: 'none',
  fontSize: '0.875rem'
};

const dividerStyle = {
  textAlign: 'center',
  margin: '2rem 0',
  position: 'relative'
};

const dividerTextStyle = {
  backgroundColor: 'white',
  color: '#64748b',
  padding: '0 1rem',
  fontSize: '0.875rem'
};

const registerButtonStyle = {
  display: 'block',
  width: '100%',
  backgroundColor: 'transparent',
  color: '#1e3a8a',
  padding: '0.75rem',
  border: '2px solid #1e3a8a',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '500',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s',
  boxSizing: 'border-box'
};

const demoInfoStyle = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  padding: '1rem',
  marginTop: '2rem'
};

const demoTitleStyle = {
  color: '#0369a1',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
};

const demoTextStyle = {
  color: '#0369a1',
  fontSize: '0.875rem',
  marginBottom: '0.5rem',
  lineHeight: '1.4'
};

const demoNoteStyle = {
  color: '#0369a1',
  fontSize: '0.75rem',
  fontStyle: 'italic'
};

export default Login;
