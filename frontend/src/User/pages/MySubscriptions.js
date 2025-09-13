import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Button,
  LinearProgress,
  Divider,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Speed,
  Upload,
  Download,
  CalendarToday,
  CheckCircle,
  TrendingUp,
  Psychology,
  ViewList,
  LocalOffer,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const MySubscriptions = () => {
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock subscriptions data
  const mockSubscriptions = [
    {
      id: 1,
      planName: 'Premium Fiber',
      status: 'active',
      price: 59.99,
      downloadSpeed: 500,
      uploadSpeed: 100,
      startDate: '2024-01-15',
      nextBilling: '2025-02-15',
      features: ['Unlimited Data', 'Free Router', 'Priority Support'],
      usageThisMonth: {
        download: 450, // GB
        upload: 120,
        totalAllowed: 'unlimited'
      }
    }
  ];

  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'suspended': return '#f59e0b';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="50vh">
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading your subscriptions...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
          My Subscriptions
        </Typography>
        {user && (
          <Typography variant="h6" color="text.secondary">
            Welcome back, {user.firstName || user.name}!
          </Typography>
        )}
      </Box>

      {subscriptions.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', my: 4 }}>
          <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>📡</Typography>
          <Typography variant="h4" gutterBottom color="primary.main">
            No Active Subscriptions
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            You don't have any active subscriptions yet. Browse our plans to get started.
          </Typography>
          <Button
            component={Link}
            to="/plans"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Plans
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {subscriptions.map(subscription => (
            <Grid item xs={12} key={subscription.id}>
              <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box>
                      <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                        {subscription.planName}
                      </Typography>
                      <Chip
                        label={subscription.status.toUpperCase()}
                        color={subscription.status === 'active' ? 'success' : 'warning'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                        ${subscription.price}
                      </Typography>
                      <Typography variant="h6" component="span" color="text.secondary">
                        /month
                      </Typography>
                    </Box>
                  </Box>

                  <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Download sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">Download</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {subscription.downloadSpeed} Mbps
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Upload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                          <Typography variant="body2" color="text.secondary">Upload</Typography>
                          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {subscription.uploadSpeed} Mbps
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUp /> This Month's Usage
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Downloaded</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {subscription.usageThisMonth.download} GB
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Uploaded</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {subscription.usageThisMonth.upload} GB
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">Start Date</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatDate(subscription.startDate)}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarToday sx={{ fontSize: 20, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">Next Billing</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {formatDate(subscription.nextBilling)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Plan Features
                    </Typography>
                    <Grid container spacing={1}>
                      {subscription.features.map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircle sx={{ fontSize: 20, color: 'success.main' }} />
                            <Typography variant="body2">{feature}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      component={Link}
                      to="/upgrade-downgrade"
                      variant="contained"
                      size="large"
                      sx={{ flex: 1, minWidth: 200 }}
                    >
                      Upgrade/Downgrade
                    </Button>
                    <Button
                      component={Link}
                      to="/cancel-renew"
                      variant="outlined"
                      size="large"
                      sx={{ flex: 1, minWidth: 200 }}
                    >
                      Manage Subscription
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card component={Link} to="/recommendations" sx={{ 
              p: 3, 
              textAlign: 'center', 
              textDecoration: 'none', 
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)', 
                boxShadow: 6 
              }
            }}>
              <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                AI Recommendations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get personalized plan suggestions
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card component={Link} to="/plans" sx={{ 
              p: 3, 
              textAlign: 'center', 
              textDecoration: 'none', 
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)', 
                boxShadow: 6 
              }
            }}>
              <ViewList sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Browse Plans
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore all available plans
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card component={Link} to="/discounts" sx={{ 
              p: 3, 
              textAlign: 'center', 
              textDecoration: 'none', 
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': { 
                transform: 'translateY(-4px)', 
                boxShadow: 6 
              }
            }}>
              <LocalOffer sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Special Offers
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check current promotions
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MySubscriptions;
