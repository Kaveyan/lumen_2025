import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd,
  Security,
  Speed,
  Psychology,
} from '@mui/icons-material';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isAuthenticated', 'true');

        if (data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check if the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', py: 4 }}>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* Left side - Login Form */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <Box textAlign="center" mb={4}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                Welcome Back
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Sign in to your Lumen Broadband account
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your email"
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
                variant="outlined"
                placeholder="Enter your password"
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
                sx={{ mb: 3, py: 1.5 }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?
                </Typography>
              </Divider>

              <Button
                component={Link}
                to="/register"
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<PersonAdd />}
                sx={{ py: 1.5 }}
              >
                Create New Account
              </Button>
            </Box>

            {/* Demo Credentials */}
            <Card sx={{ mt: 4, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
                  🚀 Demo Credentials
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Email:</strong> demo@lumen.com<br />
                  <strong>Password:</strong> demo123
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Try both Customer and Administrator login types
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>

        {/* Right side - Features */}
        <Grid item xs={12} md={6}>
          <Box sx={{ pl: { md: 4 } }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
              Why Choose Lumen?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Experience the future of broadband services with AI-powered recommendations
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'primary.100' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Psychology sx={{ color: 'primary.main', mr: 2, fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      AI-Powered Recommendations
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Get personalized plan suggestions based on your usage patterns and preferences
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'secondary.100' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Speed sx={{ color: 'secondary.main', mr: 2, fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Lightning Fast Speeds
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    Enjoy blazing fast internet speeds up to 1 Gbps for seamless streaming and gaming
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 3, height: '100%', border: '1px solid', borderColor: 'success.100' }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Security sx={{ color: 'success.main', mr: 2, fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Secure & Reliable
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">
                    99.9% uptime guarantee with enterprise-grade security for your peace of mind
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Box mt={4}>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                New to Lumen? Register with any email and password to get started.
                <br />
                Choose 'admin' role during registration for admin access.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
