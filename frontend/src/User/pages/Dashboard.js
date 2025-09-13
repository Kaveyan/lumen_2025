import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <div style={loadingStyle}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <div style={headerContentStyle}>
                    <div>
                        <h1 style={titleStyle}>Welcome back, {user.firstName}!</h1>
                        <p style={subtitleStyle}>Manage your broadband services and explore AI-powered recommendations</p>
                    </div>
                    <button onClick={handleLogout} style={logoutButtonStyle}>
                        Logout
                    </button>
                </div>
            </div>

            <div style={dashboardGridStyle}>
                {/* Quick Stats */}
                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>Current Plan</h3>
                    <div style={statValueStyle}>{user.currentPlan || 'No Active Plan'}</div>
                    <p style={cardDescStyle}>Your current subscription</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>Account Status</h3>
                    <div style={statValueStyle}>{user.subscriptionStatus || 'Active'}</div>
                    <p style={cardDescStyle}>Service status</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>Data Usage</h3>
                    <div style={statValueStyle}>{user.usageData?.averageDownload || 250} GB</div>
                    <p style={cardDescStyle}>Monthly average</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={cardTitleStyle}>Connected Devices</h3>
                    <div style={statValueStyle}>{user.usageData?.deviceCount || 8}</div>
                    <p style={cardDescStyle}>Active connections</p>
                </div>
            </div>

            <div style={actionGridStyle}>
                {/* Quick Actions */}
                <div style={actionCardStyle} onClick={() => navigate('/my-subscriptions')}>
                    <div style={actionIconStyle}>📋</div>
                    <h3 style={actionTitleStyle}>My Subscriptions</h3>
                    <p style={actionDescStyle}>View and manage your active plans</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/recommendations')}>
                    <div style={actionIconStyle}>🤖</div>
                    <h3 style={actionTitleStyle}>AI Recommendations</h3>
                    <p style={actionDescStyle}>Get personalized plan suggestions</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/plans')}>
                    <div style={actionIconStyle}>📊</div>
                    <h3 style={actionTitleStyle}>Browse Plans</h3>
                    <p style={actionDescStyle}>Explore available broadband plans</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/profile')}>
                    <div style={actionIconStyle}>👤</div>
                    <h3 style={actionTitleStyle}>Profile Settings</h3>
                    <p style={actionDescStyle}>Update your account information</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/discounts')}>
                    <div style={actionIconStyle}>💰</div>
                    <h3 style={actionTitleStyle}>Special Offers</h3>
                    <p style={actionDescStyle}>View current discounts and promotions</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/upgrade-downgrade')}>
                    <div style={actionIconStyle}>⚡</div>
                    <h3 style={actionTitleStyle}>Upgrade/Downgrade</h3>
                    <p style={actionDescStyle}>Change your subscription plan</p>
                </div>
            </div>

            <div style={recentActivityStyle}>
                <h2 style={sectionTitleStyle}>Recent Activity</h2>
                <div style={activityListStyle}>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>✅</div>
                        <div>
                            <div style={activityTitleStyle}>Account Created</div>
                            <div style={activityTimeStyle}>Welcome to Lumen Broadband!</div>
                        </div>
                    </div>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>🔐</div>
                        <div>
                            <div style={activityTitleStyle}>Login Successful</div>
                            <div style={activityTimeStyle}>Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Just now'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    padding: '2rem'
};

const loadingStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#64748b'
};

const headerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
};

const headerContentStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
};

const subtitleStyle = {
    color: '#64748b',
    fontSize: '1.1rem'
};

const logoutButtonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
};

const dashboardGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
};

const cardTitleStyle = {
    fontSize: '1rem',
    color: '#64748b',
    marginBottom: '0.5rem',
    fontWeight: '500'
};

const statValueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
};

const cardDescStyle = {
    fontSize: '0.875rem',
    color: '#94a3b8'
};

const actionGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
};

const actionCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    textAlign: 'center'
};

const actionIconStyle = {
    fontSize: '2.5rem',
    marginBottom: '1rem'
};

const actionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
};

const actionDescStyle = {
    color: '#64748b',
    fontSize: '0.95rem'
};

const recentActivityStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
};

const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '1.5rem'
};

const activityListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
};

const activityItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
};

const activityIconStyle = {
    fontSize: '1.5rem'
};

const activityTitleStyle = {
    fontWeight: '500',
    color: '#374151'
};

const activityTimeStyle = {
    fontSize: '0.875rem',
    color: '#64748b'
};

export default Dashboard;
