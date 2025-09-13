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
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import {
  People,
  TrendingUp,
  AttachMoney,
  Psychology,
  Analytics,
  Settings,
  Support,
  AdminPanelSettings,
  ExitToApp
} from '@mui/icons-material';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeSubscriptions: 0,
        totalRevenue: 0,
        churnRate: 0
    });
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
                if (parsedUser.role !== 'admin') {
                    navigate('/dashboard');
                    return;
                }
                setUser(parsedUser);
                fetchAdminData(token);
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    const fetchAdminData = async (token) => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data.users || []);
                
                // Calculate stats
                const totalUsers = data.users?.length || 0;
                const activeUsers = data.users?.filter(u => u.subscriptionStatus === 'active').length || 0;
                
                setStats({
                    totalUsers,
                    activeSubscriptions: activeUsers,
                    totalRevenue: activeUsers * 59.99, // Mock calculation
                    churnRate: totalUsers > 0 ? ((totalUsers - activeUsers) / totalUsers * 100).toFixed(1) : 0
                });
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        navigate('/login');
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/auth/users/role', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId, role: newRole })
            });

            if (response.ok) {
                // Refresh user data
                fetchAdminData(token);
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Box textAlign="center">
                        <LinearProgress sx={{ mb: 2, width: 200 }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading Admin Dashboard...
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
                    <Box>
                        <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                            Admin Dashboard
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            Welcome, {user.firstName}! Manage your broadband service platform
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Chip
                            icon={<AdminPanelSettings />}
                            label="Administrator"
                            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        />
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
                </Box>
            </Paper>

            {/* Key Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                                {stats.totalUsers}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Total Users
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <TrendingUp sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                                {stats.activeSubscriptions}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Active Subscriptions
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <AttachMoney sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                                ${stats.totalRevenue.toLocaleString()}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Monthly Revenue
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' }}>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Psychology sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                            <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                                {stats.churnRate}%
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Churn Rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Quick Actions */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
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
                        onClick={() => navigate('/admin/analytics')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Analytics sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Analytics & Reports
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View detailed usage and revenue analytics
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                        onClick={() => navigate('/admin/plans')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Settings sx={{ fontSize: 40, color: 'secondary.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Manage Plans
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Create and modify subscription plans
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                        onClick={() => navigate('/admin/ai-insights')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Psychology sx={{ fontSize: 40, color: 'success.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                AI Insights
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                AI-powered business intelligence
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
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
                        onClick={() => navigate('/admin/support')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Support sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Customer Support
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage customer inquiries and tickets
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* User Management */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    User Management
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.50' }}>
                                <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Plan</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, 10).map((userData) => (
                                <TableRow key={userData.id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                {userData.firstName?.charAt(0) || userData.email?.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {userData.firstName} {userData.lastName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{userData.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userData.role}
                                            color={userData.role === 'admin' ? 'secondary' : 'primary'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userData.subscriptionStatus || 'inactive'}
                                            color={userData.subscriptionStatus === 'active' ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{userData.currentPlan || 'None'}</TableCell>
                                    <TableCell>
                                        <FormControl size="small" sx={{ minWidth: 100 }}>
                                            <Select
                                                value={userData.role}
                                                onChange={(e) => updateUserRole(userData.id, e.target.value)}
                                            >
                                                <MenuItem value="user">User</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                
                {users.length > 10 && (
                    <Box textAlign="center" mt={3}>
                        <Button variant="outlined" size="large">
                            Show All {users.length} Users
                        </Button>
                    </Box>
                )}
            </Paper>

            {/* Recent Activity */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'primary.main' }}>
                    Recent System Activity
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 2, bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <People sx={{ color: 'primary.main' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        New User Registration
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Latest user joined the platform
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 2, bgcolor: 'secondary.50', border: '1px solid', borderColor: 'secondary.200' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <Psychology sx={{ color: 'secondary.main' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        AI Recommendations Generated
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        AI system processed user recommendations
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 2, bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <AttachMoney sx={{ color: 'success.main' }} />
                                <Box>
                                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                        Subscription Updates
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Users updated their subscription plans
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

export default AdminDashboard;
