import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role || 'user',
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Account created successfully! Redirecting...');
        
        // Store authentication data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');

        // Redirect based on role
        setTimeout(() => {
          if (data.user.role === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/dashboard');
          }
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }

    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={registerBoxStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Create Account</h1>
          <p style={subtitleStyle}>Join Lumen Broadband today</p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div style={errorStyle}>
              {error}
            </div>
          )}
          
          {success && (
            <div style={successStyle}>
              {success}
            </div>
          )}

          <div style={rowStyle}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                style={inputStyle}
                required
              />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                style={inputStyle}
                required
              />
            </div>
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
            <label style={labelStyle}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              style={inputStyle}
              required
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              style={inputStyle}
              required
            />
          </div>

          <div style={rowStyle}>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                style={inputStyle}
                required
              />
            </div>
            <div style={fieldGroupStyle}>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...submitButtonStyle,
              ...(loading ? disabledButtonStyle : {})
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={dividerStyle}>
          <span style={dividerTextStyle}>Already have an account?</span>
        </div>

        <Link to="/login" style={loginButtonStyle}>
          Sign In
        </Link>
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

const registerBoxStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  padding: '3rem',
  width: '100%',
  maxWidth: '600px'
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

const successStyle = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  color: '#166534',
  padding: '0.75rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  fontSize: '0.875rem'
};

const rowStyle = {
  display: 'flex',
  gap: '1rem'
};

const fieldGroupStyle = {
  marginBottom: '1.5rem',
  flex: '1'
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

const loginButtonStyle = {
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

export default Register;
