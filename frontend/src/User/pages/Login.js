import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Container,
    Paper,
    CircularProgress,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
    Divider,
    Grid,
    Stack,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material';
import {
    Login as LoginIcon,
    AdminPanelSettings,
    Person,
    PersonAdd,
    Psychology,
    Speed,
    Security,
    TravelExplore,
} from '@mui/icons-material';


// --- Custom Theme for a Professional Look ---
const professionalTheme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // A classic, professional blue
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#64748B', // A cool grey for secondary actions
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // A very light grey for the page background
            paper: '#ffffff',
        },
        text: {
            primary: '#1E293B',
            secondary: '#475569',
        },
    },
    typography: {
        fontFamily: "'Inter', sans-serif",
        h4: {
            fontWeight: 700,
        },
        h5: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 20px',
                },
                containedPrimary: {
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
                    '&:hover': {
                        boxShadow: '0 6px 16px rgba(25, 118, 210, 0.3)',
                        transform: 'translateY(-2px)',
                    }
                }
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                           borderColor: '#1976d2',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                }
            }
        },
         MuiToggleButton: {
            styleOverrides: {
                root: {
                     borderRadius: 8,
                     border: '1px solid rgba(0, 0, 0, 0.12)',
                     '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        color: '#1565c0',
                        '&:hover': {
                           backgroundColor: 'rgba(25, 118, 210, 0.15)',
                        }
                    }
                }
            }
        }
    },
});

const FeatureCard = ({ icon, title, description }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, textAlign: 'left' }}>
        <Box sx={{
            mt: 0.5,
            width: 48,
            height: 48,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
            color: 'white'
        }}>
            {icon}
        </Box>
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'white', mb: 0.5 }}>
                {title}
            </Typography>
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {description}
            </Typography>
        </Box>
    </Box>
);


const Login = () => {
    // --- STATE AND HOOKS (Functionality unchanged) ---
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginRole, setLoginRole] = useState('user');
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const demoCredentials = {
        user: { email: 'user@lumen.com', password: 'user123' },
        admin: { email: 'admin@lumen.com', password: 'admin123' }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            if (isRegisterMode) {
                setRegisterData({ ...registerData, role: newRole });
            } else {
                setLoginRole(newRole);
                setFormData({
                    email: demoCredentials[newRole].email,
                    password: demoCredentials[newRole].password
                });
            }
            setError('');
        }
    };

    const handleDemoLogin = (role) => {
        setLoginRole(role);
        setFormData({
            email: demoCredentials[role].email,
            password: demoCredentials[role].password
        });
        setError('');
    };
    
    const toggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setError('');
        setFormData({ email: '', password: '' });
        setRegisterData({
            firstName: '', lastName: '', email: '', phone: '',
            address: '', password: '', confirmPassword: '', role: 'user'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isRegisterMode) {
                if (registerData.password !== registerData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                
                // Real Registration API Call
                const response = await fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: registerData.firstName,
                        lastName: registerData.lastName,
                        email: registerData.email,
                        phone: registerData.phone,
                        address: registerData.address,
                        password: registerData.password,
                        role: registerData.role
                    })
                });

                const data = await response.json();

                if (data.success) {
                    login(data.user, data.token);
                    const from = location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
                    navigate(from, { replace: true });
                } else {
                    setError(data.message || 'Registration failed');
                }

            } else {
                // Real Login API Call
                const response = await fetch('http://localhost:5000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (data.success) {
                    login(data.user, data.token);
                    const from = location.state?.from?.pathname || (data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard');
                    navigate(from, { replace: true });
                } else {
                    setError(data.message || 'Login failed');
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            setError('Network error. Please check if the server is running.');
        } finally {
            setIsLoading(false);
        }
    };


    // --- RENDER (New professional design) ---
    return (
        <ThemeProvider theme={professionalTheme}>
            <CssBaseline />
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                minHeight: '100vh',
                backgroundColor: 'background.default'
            }}>
                {/* --- Left Side: Form --- */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 4, md: 6 },
                }}>
                    <Paper elevation={4} sx={{
                        p: { xs: 3, sm: 5 },
                        width: '100%',
                        maxWidth: 480
                    }}>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <TravelExplore color="primary" sx={{ fontSize: '2.5rem' }} />
                                Lumen
                            </Typography>
                            <Typography variant="body1" color="text.secondary" mt={1}>
                                {isRegisterMode ? 'Join Lumen Broadband today' : 'Sign in to your broadband account'}
                            </Typography>
                        </Box>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <ToggleButtonGroup
                                    value={isRegisterMode ? registerData.role : loginRole}
                                    exclusive
                                    onChange={handleRoleChange}
                                    fullWidth
                                >
                                    <ToggleButton value="user"><Person sx={{ mr: 1 }} /> Customer</ToggleButton>
                                    <ToggleButton value="admin"><AdminPanelSettings sx={{ mr: 1 }} /> Admin</ToggleButton>
                                </ToggleButtonGroup>

                                {isRegisterMode ? (
                                    <>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="First Name" name="firstName" value={registerData.firstName} onChange={handleRegisterChange} required />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField fullWidth label="Last Name" name="lastName" value={registerData.lastName} onChange={handleRegisterChange} required />
                                            </Grid>
                                        </Grid>
                                        <TextField fullWidth label="Email Address" name="email" type="email" value={registerData.email} onChange={handleRegisterChange} required />
                                        <TextField fullWidth label="Phone Number" name="phone" value={registerData.phone} onChange={handleRegisterChange} />
                                        <TextField fullWidth label="Address" name="address" value={registerData.address} onChange={handleRegisterChange} />
                                        <TextField fullWidth label="Password" name="password" type="password" value={registerData.password} onChange={handleRegisterChange} required />
                                        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={registerData.confirmPassword} onChange={handleRegisterChange} required />
                                    </>
                                ) : (
                                    <>
                                        <TextField fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                        <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                                    </>
                                )}

                                {error && (
                                    <Alert severity="error" variant="outlined">{error}</Alert>
                                )}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                >
                                    {isLoading ? (isRegisterMode ? 'Creating Account...' : 'Signing In...') : (isRegisterMode ? 'Create Account' : 'Sign In')}
                                </Button>

                                <Divider>
                                    <Typography variant="body2" color="text.secondary">
                                      {isRegisterMode ? 'Already a member?' : "Don't have an account?"}
                                    </Typography>
                                </Divider>

                                <Button onClick={toggleMode} fullWidth variant="outlined" color="secondary" size="large">
                                    {isRegisterMode ? 'Sign In Instead' : 'Create New Account'}
                                </Button>
                            </Stack>
                        </form>
                    </Paper>
                </Box>
                
                {/* --- Right Side: Feature Showcase --- */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
                     '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundImage: `
                            radial-gradient(circle at 15% 85%, rgba(255,255,255,0.1) 0%, transparent 30%),
                            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 25%)
                        `,
                        opacity: 0.5,
                    }
                }}>
                    <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
                        <Typography variant="h3" component="h2" sx={{
                            fontWeight: 800,
                            color: 'white',
                            textAlign: 'center',
                            mb: 2,
                            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                           Discover the Lumen Difference
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                textAlign: 'center',
                                fontWeight: 400,
                                mb: 6,
                                lineHeight: 1.6
                            }}>
                            Experience the future of broadband with AI-powered recommendations and lightning-fast speeds.
                        </Typography>

                        <Stack spacing={4}>
                            <FeatureCard 
                                icon={<Psychology fontSize="large" />} 
                                title="AI-Powered Recommendations" 
                                description="Get personalized plan suggestions based on your usage patterns and preferences."
                            />
                             <FeatureCard 
                                icon={<Speed fontSize="large" />} 
                                title="Lightning Fast Speeds" 
                                description="Enjoy blazing fast internet speeds up to 1 Gbps for seamless streaming and gaming."
                            />
                             <FeatureCard 
                                icon={<Security fontSize="large" />} 
                                title="Secure & Reliable" 
                                description="99.9% uptime guarantee with enterprise-grade security for your peace of mind."
                            />
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Login;
