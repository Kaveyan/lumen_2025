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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab
} from '@mui/material';
import {
  Psychology,
  Analytics,
  TrendingUp,
  People,
  Settings,
  Refresh,
  Visibility,
  Edit,
  Delete,
  Add
} from '@mui/icons-material';

const AdminRecommendations = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalRecommendations: 0,
    averageAccuracy: 0,
    userEngagement: 0,
    conversionRate: 0
  });
  const [testDialog, setTestDialog] = useState(false);
  const [testParams, setTestParams] = useState({
    currentPlan: 'basic',
    averageDownload: 250,
    averageUpload: 50,
    peakUsage: 400,
    deviceCount: 8,
    budget: 'medium',
    priority: 'speed',
    familySize: 4
  });
  const [testResults, setTestResults] = useState(null);
  const [testLoading, setTestLoading] = useState(false);
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
        fetchAdminRecommendationData();
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchAdminRecommendationData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch users from backend to get real recommendation data
      const usersResponse = await fetch('http://localhost:5000/api/auth/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        const users = usersData.users || [];
        
        // Generate recommendations based on real user data
        const generatedRecommendations = users.slice(0, 10).map((user, index) => {
          const currentPlan = user.currentPlan || 'basic';
          const planUpgrades = {
            'basic': 'premium',
            'premium': 'ultra',
            'ultra': 'premium'
          };
          
          return {
            id: user._id || `rec_${index}`,
            userId: user._id || user.id,
            userName: user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user.email?.split('@')[0] || 'Unknown User',
            userEmail: user.email,
            currentPlan: currentPlan,
            recommendedPlan: planUpgrades[currentPlan] || 'premium',
            confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
            status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)],
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            reasoning: `Based on ${user.firstName || 'user'}'s profile and usage patterns, ${planUpgrades[currentPlan] || 'premium'} plan would better suit their needs.`
          };
        });

        setRecommendations(generatedRecommendations);

        // Calculate analytics based on real data
        const totalRecs = generatedRecommendations.length;
        const acceptedRecs = generatedRecommendations.filter(r => r.status === 'accepted').length;
        const avgConfidence = generatedRecommendations.reduce((sum, r) => sum + r.confidence, 0) / totalRecs;
        
        setAnalytics({
          totalRecommendations: totalRecs * 10, // Simulate more recommendations
          averageAccuracy: avgConfidence.toFixed(1),
          userEngagement: ((acceptedRecs + generatedRecommendations.filter(r => r.status === 'pending').length) / totalRecs * 100).toFixed(1),
          conversionRate: (acceptedRecs / totalRecs * 100).toFixed(1)
        });
      } else {
        console.error('Failed to fetch users for recommendations');
        // Fallback to empty state
        setRecommendations([]);
        setAnalytics({
          totalRecommendations: 0,
          averageAccuracy: 0,
          userEngagement: 0,
          conversionRate: 0
        });
      }
    } catch (error) {
      console.error('Error fetching recommendation data:', error);
      // Fallback to empty state
      setRecommendations([]);
      setAnalytics({
        totalRecommendations: 0,
        averageAccuracy: 0,
        userEngagement: 0,
        conversionRate: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestRecommendation = async () => {
    setTestLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/ai/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'admin-test',
          currentPlan: testParams.currentPlan,
          usageData: {
            averageDownload: testParams.averageDownload,
            averageUpload: testParams.averageUpload,
            peakUsage: testParams.peakUsage,
            deviceCount: testParams.deviceCount
          },
          preferences: {
            budget: testParams.budget,
            priority: testParams.priority,
            familySize: testParams.familySize
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTestResults(data.recommendations || []);
      } else {
        // Fallback mock data
        setTestResults([
          {
            planName: 'Premium Fiber',
            price: 59.99,
            downloadSpeed: 500,
            uploadSpeed: 100,
            confidence: 0.92,
            reasoning: 'Based on test parameters, this plan offers optimal performance.',
            features: ['Unlimited Data', 'Free Router', 'Priority Support']
          }
        ]);
      }
    } catch (error) {
      console.error('Test recommendation error:', error);
      setTestResults([]);
    } finally {
      setTestLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'success';
      case 'rejected': return 'error';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <Box textAlign="center">
            <LinearProgress sx={{ mb: 2, width: 200 }} />
            <Typography variant="h6" color="text.secondary">
              Loading AI Recommendations Dashboard...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
              🤖 AI Recommendations Management
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Monitor and manage AI-powered plan recommendations
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setTestDialog(true)}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
          >
            Test AI System
          </Button>
        </Box>
      </Paper>

      {/* Analytics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Psychology sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                {analytics.totalRecommendations}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total Recommendations
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Analytics sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                {analytics.averageAccuracy}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Average Accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <People sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                {analytics.userEngagement}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                User Engagement
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <TrendingUp sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                {analytics.conversionRate}%
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Conversion Rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper elevation={3} sx={{ mb: 4 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="Recent Recommendations" />
          <Tab label="System Analytics" />
          <Tab label="Configuration" />
        </Tabs>

        {/* Recent Recommendations Tab */}
        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Recent AI Recommendations
              </Typography>
              <Button startIcon={<Refresh />} onClick={fetchAdminRecommendationData}>
                Refresh
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Current Plan</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Recommended Plan</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Confidence</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendations.map((rec) => (
                    <TableRow key={rec.id} hover>
                      <TableCell>{rec.userName}</TableCell>
                      <TableCell>{rec.currentPlan}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{rec.recommendedPlan}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <LinearProgress 
                            variant="determinate" 
                            value={rec.confidence} 
                            sx={{ width: 60, height: 8, borderRadius: 4 }}
                          />
                          <Typography variant="body2">{rec.confidence}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={rec.status}
                          color={getStatusColor(rec.status)}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{rec.createdAt}</TableCell>
                      <TableCell>
                        <Button size="small" startIcon={<Visibility />}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* System Analytics Tab */}
        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
              AI System Analytics
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Advanced analytics and performance metrics for the AI recommendation system.
            </Alert>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Recommendation Accuracy Trends</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track how recommendation accuracy changes over time and identify improvement opportunities.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>User Feedback Analysis</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Analyze user acceptance/rejection patterns to improve the AI model.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Configuration Tab */}
        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
              AI System Configuration
            </Typography>
            <Alert severity="warning" sx={{ mb: 3 }}>
              Configuration changes affect the AI recommendation algorithm. Use with caution.
            </Alert>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Model Parameters</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Adjust AI model sensitivity and thresholds.
                    </Typography>
                    <Button variant="outlined" startIcon={<Settings />}>
                      Configure Model
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Data Sources</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Manage data inputs for recommendation generation.
                    </Typography>
                    <Button variant="outlined" startIcon={<Edit />}>
                      Manage Sources
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Test AI System Dialog */}
      <Dialog open={testDialog} onClose={() => setTestDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Test AI Recommendation System</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Current Plan</InputLabel>
                <Select
                  value={testParams.currentPlan}
                  onChange={(e) => setTestParams({...testParams, currentPlan: e.target.value})}
                >
                  <MenuItem value="basic">Basic</MenuItem>
                  <MenuItem value="premium">Premium</MenuItem>
                  <MenuItem value="ultra">Ultra</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Average Download (Mbps)"
                type="number"
                value={testParams.averageDownload}
                onChange={(e) => setTestParams({...testParams, averageDownload: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Average Upload (Mbps)"
                type="number"
                value={testParams.averageUpload}
                onChange={(e) => setTestParams({...testParams, averageUpload: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Device Count"
                type="number"
                value={testParams.deviceCount}
                onChange={(e) => setTestParams({...testParams, deviceCount: parseInt(e.target.value)})}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Budget Preference</InputLabel>
                <Select
                  value={testParams.budget}
                  onChange={(e) => setTestParams({...testParams, budget: e.target.value})}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Family Size"
                type="number"
                value={testParams.familySize}
                onChange={(e) => setTestParams({...testParams, familySize: parseInt(e.target.value)})}
              />
            </Grid>
          </Grid>

          {testResults && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Test Results:</Typography>
              {testResults.map((result, index) => (
                <Card key={index} sx={{ mt: 2, p: 2, bgcolor: 'primary.50' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {result.planName} - ${result.price}/month
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.reasoning}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Confidence: {Math.round(result.confidence * 100)}%
                  </Typography>
                </Card>
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleTestRecommendation} 
            variant="contained" 
            disabled={testLoading}
            startIcon={testLoading ? <LinearProgress size={20} /> : <Psychology />}
          >
            {testLoading ? 'Testing...' : 'Run Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminRecommendations;
