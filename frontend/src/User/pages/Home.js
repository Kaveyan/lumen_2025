import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Speed,
  Psychology,
  AttachMoney,
  Support,
  CheckCircle,
  Wifi,
  Security,
  TrendingUp
} from '@mui/icons-material';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            🌐 Welcome to Lumen Broadband
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, opacity: 0.9 }}>
            AI-Powered Subscription Management for Modern Connectivity
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, maxWidth: 600, mx: 'auto' }}>
            Experience lightning-fast internet with our intelligent platform that learns your usage patterns 
            and recommends the perfect plan for your needs.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
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
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 6 }}>
          Why Choose Lumen Broadband?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={3} sx={{ height: '100%', textAlign: 'center', p: 3 }}>
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
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ fontWeight: 700, color: 'primary.main', mb: 6 }}>
            Popular Plans
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={4} sx={{ height: '100%', position: 'relative' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Basic Fiber
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      $39.99
                    </Typography>
                    <Typography variant="h6" component="span" color="text.secondary">
                      /month
                    </Typography>
                  </Box>
                  <List sx={{ mb: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="100 Mbps Download" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="20 Mbps Upload" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Unlimited Data" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Free Installation" />
                    </ListItem>
                  </List>
                  <Button
                    component={Link}
                    to="/plans"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={6} sx={{ height: '100%', position: 'relative', border: '2px solid', borderColor: 'primary.main' }}>
                <Chip
                  label="Most Popular"
                  color="primary"
                  sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}
                />
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Premium Fiber
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      $59.99
                    </Typography>
                    <Typography variant="h6" component="span" color="text.secondary">
                      /month
                    </Typography>
                  </Box>
                  <List sx={{ mb: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="500 Mbps Download" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="100 Mbps Upload" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Unlimited Data" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Free Router" />
                    </ListItem>
                  </List>
                  <Button
                    component={Link}
                    to="/plans"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card elevation={4} sx={{ height: '100%', position: 'relative' }}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                    Ultra Fiber
                  </Typography>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                      $89.99
                    </Typography>
                    <Typography variant="h6" component="span" color="text.secondary">
                      /month
                    </Typography>
                  </Box>
                  <List sx={{ mb: 3 }}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="1 Gbps Download" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="500 Mbps Upload" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Unlimited Data" />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
                      <ListItemText primary="Priority Support" />
                    </ListItem>
                  </List>
                  <Button
                    component={Link}
                    to="/plans"
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button
              component={Link}
              to="/plans"
              variant="outlined"
              size="large"
              sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
            >
              View All Plans
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Trust Indicators */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Security sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                99.9% Uptime
              </Typography>
              <Typography color="text.secondary">
                Reliable service you can count on
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Wifi sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Fiber Network
              </Typography>
              <Typography color="text.secondary">
                Future-proof technology
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <TrendingUp sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                No Contracts
              </Typography>
              <Typography color="text.secondary">
                Flexible plans that grow with you
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
