import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Rating,
  Avatar
} from '@mui/material';
import { 
  CheckCircle, 
  Wifi, 
  Speed, 
  Security,
  Psychology,
  AttachMoney,
  Support,
  TrendingUp,
  Star,
  BusinessCenter,
  Home as HomeIcon,
  Smartphone,
  Router,
  CloudDone,
  Shield
} from '@mui/icons-material';
import subscriptionService from '../../services/subscriptionService';

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [plansResponse, subscriptionResponse] = await Promise.all([
        subscriptionService.getAvailablePlans(),
        subscriptionService.getCurrentSubscription()
      ]);
      
      if (plansResponse.success) {
        setPlans(plansResponse.plans);
      }
      
      if (subscriptionResponse.success) {
        setCurrentSubscription(subscriptionResponse.subscription);
      }
    } catch (err) {
      setError('Failed to load subscription data');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    if (currentSubscription) {
      // User has existing subscription, redirect to upgrade/downgrade
      navigate('/upgrade-downgrade');
    } else {
      // New subscription
      setSelectedPlan(plan);
      setConfirmDialog(true);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan) return;
    
    try {
      setSubscribing(true);
      const response = await subscriptionService.subscribeToNewPlan(selectedPlan.id);
      
      if (response.success) {
        setConfirmDialog(false);
        await loadData(); // Refresh data
        alert(`Successfully subscribed to ${selectedPlan.name}!`);
      }
    } catch (err) {
      alert(`Failed to subscribe: ${err.message}`);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading plans...</Typography>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          minHeight: '70vh'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box sx={{ mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 700, 
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                color: 'white',
                mb: 3,
                letterSpacing: '-0.02em',
                textAlign: 'center'
              }}
            >
              🌐 Lumen Broadband
            </Typography>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                mb: 4, 
                opacity: 0.95,
                fontWeight: 400,
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '0.01em',
                textAlign: 'center'
              }}
            >
              AI-Powered Internet Solutions
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6, 
                opacity: 0.9, 
                maxWidth: 700, 
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.25rem' },
                textAlign: 'center'
              }}
            >
              Experience lightning-fast fiber connectivity with intelligent recommendations 
              tailored to your usage patterns and needs.
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mb: 8 }}>
            <Button
              component={Link}
              to="/plans"
              variant="contained"
              size="large"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              View Plans
            </Button>
            <Button
              component={Link}
              to="/recommendations"
              variant="outlined"
              size="large"
              startIcon={<Psychology />}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'white' }
              }}
            >
              Get AI Recommendations
            </Button>
          </Box>

          {/* Stats Section */}
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>50K+</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Happy Customers</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>99.9%</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Uptime</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>1Gbps</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Max Speed</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box textAlign="center">
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>24/7</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Support</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              mb: 2
            }}
          >
            Why Choose Lumen Broadband?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Experience the future of connectivity with our cutting-edge technology and personalized service
          </Typography>
        </Box>
        
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              elevation={3}
              sx={{ 
                height: '100%', 
                textAlign: 'center', 
                p: 3
              }}
            >
              <Speed sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Lightning Fast
              </Typography>
              <Typography color="text.secondary">
                Up to 1 Gbps speeds with our fiber-optic network
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Psychology sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                AI-Powered
              </Typography>
              <Typography color="text.secondary">
                Smart recommendations based on your usage patterns
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <AttachMoney sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                Best Value
              </Typography>
              <Typography color="text.secondary">
                Competitive pricing with no hidden fees
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', p: 3 }}>
              <Support sx={{ fontSize: 60, color: 'warning.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'warning.main' }}>
                24/7 Support
              </Typography>
              <Typography color="text.secondary">
                Round-the-clock technical support when you need it
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Popular Plans Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 6 }}>
            Popular Plans
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }} justifyContent="center">
            {plans.map((plan, index) => {
              const isPopular = plan.popular;
              const isCurrentPlan = currentSubscription && currentSubscription.planId === plan.id;
              
              return (
                <Grid item xs={12} md={4} key={plan.id}>
                  <Card 
                    elevation={isPopular ? 6 : 4} 
                    sx={{ 
                      height: '100%', 
                      position: 'relative',
                      border: isPopular ? '2px solid' : 'none',
                      borderColor: isPopular ? 'primary.main' : 'transparent',
                      opacity: isCurrentPlan ? 0.7 : 1
                    }}
                  >
                    {isPopular && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontWeight: 600
                        }}
                      />
                    )}
                    {isCurrentPlan && (
                      <Chip
                        label="Current Plan"
                        color="success"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          right: 16,
                          fontWeight: 600
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {plan.name}
                      </Typography>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          ${plan.price}
                        </Typography>
                        <Typography variant="h6" component="span" color="text.secondary">
                          /month
                        </Typography>
                      </Box>
                      <List sx={{ mb: 3 }}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary={`${plan.downloadSpeed} Mbps Download`} />
                        </ListItem>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                          <ListItemText primary={`${plan.uploadSpeed} Mbps Upload`} />
                        </ListItem>
                        {plan.features && plan.features.slice(0, 2).map((feature, idx) => (
                          <ListItem key={idx} sx={{ px: 0 }}>
                            <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                      <Button
                        onClick={() => handlePlanSelect(plan)}
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={isCurrentPlan}
                        sx={{ 
                          py: 1.5,
                          bgcolor: isPopular ? 'primary.main' : undefined
                        }}
                      >
                        {isCurrentPlan ? 'Current Plan' : currentSubscription ? 'Change Plan' : 'Choose Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Box textAlign="center">
            <Button
              component={Link}
              to="/plans"
              variant="outlined"
              size="large"
              sx={{ mt: 4, px: 4, py: 1.5 }}
            >
              View All Plans
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Customer Testimonials */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 3
            }}
          >
            What Our Customers Say
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Join thousands of satisfied customers who trust Lumen for their connectivity needs
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Rating value={5} readOnly sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                "Lumen's AI recommendations helped me find the perfect plan. The speed is incredible and customer service is outstanding!"
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}>S</Avatar>
                <Box textAlign="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Sarah Johnson</Typography>
                  <Typography variant="caption" color="text.secondary">Premium Fiber Customer</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Rating value={5} readOnly sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                "Switched to Lumen for my business and couldn't be happier. Ultra-fast speeds and reliable connection for our team."
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>M</Avatar>
                <Box textAlign="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Mike Chen</Typography>
                  <Typography variant="caption" color="text.secondary">Business Fiber Customer</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 3,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
            >
              <Rating value={5} readOnly sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', lineHeight: 1.6 }}>
                "The installation was seamless and the AI-powered dashboard makes managing my subscription so easy. Highly recommended!"
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}>E</Avatar>
                <Box textAlign="left">
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>Emily Rodriguez</Typography>
                  <Typography variant="caption" color="text.secondary">Ultra Fiber Customer</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Trust Indicators */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Security sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Enterprise Security
                </Typography>
                <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                  Bank-level encryption protecting your data and privacy
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <CloudDone sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  99.9% Uptime
                </Typography>
                <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                  Guaranteed reliability with redundant infrastructure
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Router sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Latest Technology
                </Typography>
                <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                  Cutting-edge fiber optic network infrastructure
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={3}>
              <Box textAlign="center">
                <Support sx={{ fontSize: 60, mb: 2, opacity: 0.9 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Local Support
                </Typography>
                <Typography sx={{ opacity: 0.8, lineHeight: 1.6 }}>
                  24/7 expert support with local technicians
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box 
          textAlign="center" 
          sx={{ 
            bgcolor: 'grey.50', 
            borderRadius: 4, 
            p: 8,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              mb: 3
            }}
          >
            Ready to Experience the Future?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ mb: 5, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Join thousands of satisfied customers and discover why Lumen is the smart choice for modern connectivity.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              to="/plans"
              variant="contained"
              size="large"
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 35px rgba(30, 58, 138, 0.4)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Today
            </Button>
            <Button
              component={Link}
              to="/recommendations"
              variant="outlined"
              size="large"
              startIcon={<Psychology />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get AI Recommendations
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Confirm Subscription
        </DialogTitle>
        <DialogContent>
          {selectedPlan && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Subscribe to {selectedPlan.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Price: ${selectedPlan.price}/month
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Speed: {selectedPlan.downloadSpeed} Mbps Download / {selectedPlan.uploadSpeed} Mbps Upload
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Are you sure you want to subscribe to this plan?
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)} disabled={subscribing}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubscribe} 
            variant="contained" 
            disabled={subscribing}
            startIcon={subscribing ? <CircularProgress size={20} /> : null}
          >
            {subscribing ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
