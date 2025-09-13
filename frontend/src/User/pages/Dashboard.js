import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Paper,
  LinearProgress
} from '@mui/material';
import {
  Subscriptions,
  Psychology,
  ViewList,
  AccountCircle,
  LocalOffer,
  TrendingUp,
  ExitToApp,
  Person,
  Speed,
  Devices,
  CheckCircle,
  Security,
  Settings,
  Upgrade,
  DataUsage
} from '@mui/icons-material';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (!token || !userData) {
                navigate('/login');
                return;
            }

            try {
                const parsedUser = JSON.parse(userData);
                if (parsedUser.role === 'admin') {
                    navigate('/admin/dashboard');
                    return;
                }
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Box textAlign="center">
                        <LinearProgress sx={{ mb: 2, width: 200 }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading Dashboard...
                        </Typography>
                    </Box>
                </Box>
            </Container>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Header */}
            <Paper elevation={2} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={3}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64, fontSize: '1.5rem' }}>
                            {user.firstName?.charAt(0) || user.email?.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                                Welcome back, {user.firstName}!
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                                Manage your broadband services and explore AI-powered recommendations
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<ExitToApp />}
                        onClick={handleLogout}
                        sx={{ bgcolor: 'rgba(239, 68, 68, 0.9)' }}
                    >
                        Logout
                    </Button>
                </Box>
            </Paper>

            {/* Quick Stats */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Subscriptions sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                {user.currentPlan || 'No Plan'}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Current Plan
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                                {user.subscriptionStatus || 'Active'}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Account Status
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <DataUsage sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                                {user.usageData?.averageDownload || 250} GB
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Monthly Usage
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Devices sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main', mb: 1 }}>
                                {user.usageData?.deviceCount || 8}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Connected Devices
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/my-subscriptions')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Subscriptions sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                My Subscriptions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View and manage your active plans
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/recommendations')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Psychology sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                AI Recommendations
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Get personalized plan suggestions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/plans')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <ViewList sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Browse Plans
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Explore available broadband plans
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/profile')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <AccountCircle sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Profile Settings
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Update your account information
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/discounts')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <LocalOffer sx={{ fontSize: 40, color: 'error.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Special Offers
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View current discounts and promotions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        elevation={2} 
                        sx={{ 
                            height: '100%', 
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            '&:hover': { 
                                transform: 'translateY(-4px)', 
                                boxShadow: 6 
                            }
                        }}
                        onClick={() => navigate('/upgrade-downgrade')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <TrendingUp sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Upgrade/Downgrade
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Change your subscription plan
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Recent Activity */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    Recent Activity
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <CheckCircle sx={{ color: 'success.main' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        Account Created
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Welcome to Lumen Broadband!
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Security sx={{ color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        Login Successful
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Dashboard;
