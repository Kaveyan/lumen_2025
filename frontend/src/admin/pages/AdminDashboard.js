import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    LinearProgress,
    Avatar,
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
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar
} from 'recharts';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({
        totalUsers: 0,
        activeSubscriptions: 0,
        monthlyRevenue: 0,
        churnRate: 0,
        revenueGrowth: 0,
        revenueByMonth: [],
        subscriptionsByPlan: [],
        recentActivity: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAdminData = useCallback(async () => {
        try {
            setLoading(true);
            // Load dashboard analytics
            const analyticsResponse = await adminService.getDashboardAnalytics();
            if (analyticsResponse.success) {
                setAnalytics(analyticsResponse.analytics);
            }
            
            // Load user management data
            const usersResponse = await adminService.getUserManagement(1, 10);
            if (usersResponse.success) {
                setUsers(usersResponse.users);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    }, [adminService]);

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
                fetchAdminData();
            } catch (error) {
                console.error('Error parsing user data:', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate, fetchAdminData]);

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

    const updateUserSubscription = async (userId, newPlanId) => {
        try {
            console.log('Updating subscription for user:', userId, 'to plan:', newPlanId);
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/subscriptions/admin/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId, newPlanId, billingCycle: 'monthly' })
            });

            const result = await response.json();
            console.log('Update response:', result);

            if (response.ok) {
                // Refresh user data
                fetchAdminData(token);
                alert('Subscription updated successfully!');
            } else {
                console.error('Update failed:', result);
                alert(`Failed to update subscription: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating subscription:', error);
            alert('Error updating subscription');
        }
    };

    const cancelUserSubscription = async (userId) => {
        if (!window.confirm('Are you sure you want to cancel this user\'s subscription?')) {
            return;
        }
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/subscriptions/admin/cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ userId })
            });

            if (response.ok) {
                fetchAdminData(token);
                alert('Subscription cancelled successfully!');
            } else {
                alert('Failed to cancel subscription');
            }
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            alert('Error cancelling subscription');
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
                        <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
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
                                {analytics.totalUsers}
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
                                {analytics.activeSubscriptions}
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
                                ${analytics.monthlyRevenue.toLocaleString()}
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
                                {analytics.churnRate}%
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Churn Rate
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Analytics Charts */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
                <Grid item xs={12} md={8}>
                    <Card elevation={4} sx={{ borderRadius: 3, boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                                Revenue Trend (Last 6 Months)
                            </Typography>
                            <ResponsiveContainer width="100%" height={350}>
                                {/* FIX: Increased left and bottom margin to prevent labels from being cut off */}
                                <LineChart data={analytics.revenueByMonth} margin={{ top: 20, right: 30, left: 40, bottom: 30 }}>
                                    <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" vertical={false} />
                                    <XAxis 
                                        dataKey="month" 
                                        tickLine={false} 
                                        axisLine={false} 
                                        tick={{ fill: '#666', fontSize: 12 }}
                                    />
                                    <YAxis 
                                        tickLine={false} 
                                        axisLine={false} 
                                        tick={{ fill: '#666', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value.toLocaleString()}`}
                                    />
                                    <Tooltip 
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                                        contentStyle={{ 
                                            borderRadius: 8, 
                                            border: 'none', 
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        }}
                                    />
                                    <Legend verticalAlign="top" height={40} />
                                    <Line 
                                        type="monotone" 
                                        dataKey="revenue" 
                                        stroke="#3b82f6" 
                                        strokeWidth={4}
                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                                        activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={4} sx={{ borderRadius: 3, boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)' }}>
                        <CardContent sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 4, fontWeight: 700, color: 'primary.main' }}>
                                Subscription Distribution
                            </Typography>
                            <ResponsiveContainer width="100%" height={350}>
                                <PieChart>
                                    {/* FIX: Removed direct labels and added a Legend for a cleaner look and to prevent overflow */}
                                    <Pie
                                        data={analytics.subscriptionsByPlan}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={2}
                                        dataKey="count"
                                        nameKey="name"
                                    >
                                        {analytics.subscriptionsByPlan.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 4]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        formatter={(value, name) => [value, name]}
                                        contentStyle={{ 
                                            borderRadius: 8, 
                                            border: 'none', 
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        }}
                                    />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
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
                        onClick={() => navigate('/admin/payments')}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <AttachMoney sx={{ fontSize: 40, color: 'warning.main', mb: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                Payment History
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                View all payment transactions
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
                                <TableCell sx={{ fontWeight: 600 }}>Role Actions</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Subscription Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, 10).map((userData) => (
                                <TableRow key={userData._id || userData.id} hover>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={2}>
                                            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                                {userData.firstName?.charAt(0) || userData.email?.charAt(0) || 'U'}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {userData.firstName && userData.lastName 
                                                        ? `${userData.firstName} ${userData.lastName}`
                                                        : userData.email?.split('@')[0] || 'Unknown User'
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{userData.email}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userData.role || 'user'}
                                            color={userData.role === 'admin' ? 'secondary' : 'primary'}
                                            size="small"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userData.subscriptionStatus || (userData.currentPlan ? 'active' : 'inactive')}
                                            color={(userData.subscriptionStatus === 'active' || userData.currentPlan) ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={userData.currentPlan || 'No Plan'}
                                            color={userData.currentPlan ? 'primary' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <FormControl size="small" sx={{ minWidth: 100 }}>
                                            <Select
                                                value={userData.role || 'user'}
                                                onChange={(e) => updateUserRole(userData._id || userData.id, e.target.value)}
                                            >
                                                <MenuItem value="user">User</MenuItem>
                                                <MenuItem value="admin">Admin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1} flexWrap="wrap">
                                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                                <Select
                                                    value={userData.currentPlan || ''}
                                                    onChange={(e) => updateUserSubscription(userData._id || userData.id, e.target.value)}
                                                    displayEmpty
                                                >
                                                    <MenuItem value="">No Plan</MenuItem>
                                                    <MenuItem value="basic-fiber">Basic Fiber</MenuItem>
                                                    <MenuItem value="premium-fiber">Premium Fiber</MenuItem>
                                                    <MenuItem value="ultra-fiber">Ultra Fiber</MenuItem>
                                                    <MenuItem value="basic-copper">Basic Copper</MenuItem>
                                                    <MenuItem value="standard-copper">Standard Copper</MenuItem>
                                                    <MenuItem value="business-fiber-pro">Business Pro</MenuItem>
                                                </Select>
                                            </FormControl>
                                            {userData.currentPlan && (
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() => cancelUserSubscription(userData._id || userData.id)}
                                                    sx={{ minWidth: 'auto', px: 1 }}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                        </Box>
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
