import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <div style={loadingStyle}>
                <div>Loading Admin Dashboard...</div>
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
                        <h1 style={titleStyle}>Admin Dashboard</h1>
                        <p style={subtitleStyle}>Welcome, {user.firstName}! Manage your broadband service platform</p>
                    </div>
                    <button onClick={handleLogout} style={logoutButtonStyle}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div style={metricsGridStyle}>
                <div style={metricCardStyle}>
                    <div style={metricIconStyle}>👥</div>
                    <div style={metricValueStyle}>{stats.totalUsers}</div>
                    <div style={metricLabelStyle}>Total Users</div>
                </div>

                <div style={metricCardStyle}>
                    <div style={metricIconStyle}>✅</div>
                    <div style={metricValueStyle}>{stats.activeSubscriptions}</div>
                    <div style={metricLabelStyle}>Active Subscriptions</div>
                </div>

                <div style={metricCardStyle}>
                    <div style={metricIconStyle}>💰</div>
                    <div style={metricValueStyle}>${stats.totalRevenue.toLocaleString()}</div>
                    <div style={metricLabelStyle}>Monthly Revenue</div>
                </div>

                <div style={metricCardStyle}>
                    <div style={metricIconStyle}>📉</div>
                    <div style={metricValueStyle}>{stats.churnRate}%</div>
                    <div style={metricLabelStyle}>Churn Rate</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={actionsGridStyle}>
                <div style={actionCardStyle} onClick={() => navigate('/admin/analytics')}>
                    <div style={actionIconStyle}>📊</div>
                    <h3 style={actionTitleStyle}>Analytics & Reports</h3>
                    <p style={actionDescStyle}>View detailed usage and revenue analytics</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/admin/plans')}>
                    <div style={actionIconStyle}>📋</div>
                    <h3 style={actionTitleStyle}>Manage Plans</h3>
                    <p style={actionDescStyle}>Create and modify subscription plans</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/admin/ai-insights')}>
                    <div style={actionIconStyle}>🤖</div>
                    <h3 style={actionTitleStyle}>AI Insights</h3>
                    <p style={actionDescStyle}>AI-powered business intelligence</p>
                </div>

                <div style={actionCardStyle} onClick={() => navigate('/admin/support')}>
                    <div style={actionIconStyle}>🎧</div>
                    <h3 style={actionTitleStyle}>Customer Support</h3>
                    <p style={actionDescStyle}>Manage customer inquiries and tickets</p>
                </div>
            </div>

            {/* User Management */}
            <div style={userManagementStyle}>
                <h2 style={sectionTitleStyle}>User Management</h2>
                <div style={userTableStyle}>
                    <div style={tableHeaderStyle}>
                        <div style={tableHeaderCellStyle}>Name</div>
                        <div style={tableHeaderCellStyle}>Email</div>
                        <div style={tableHeaderCellStyle}>Role</div>
                        <div style={tableHeaderCellStyle}>Status</div>
                        <div style={tableHeaderCellStyle}>Plan</div>
                        <div style={tableHeaderCellStyle}>Actions</div>
                    </div>
                    
                    {users.slice(0, 10).map((userData) => (
                        <div key={userData.id} style={tableRowStyle}>
                            <div style={tableCellStyle}>
                                {userData.firstName} {userData.lastName}
                            </div>
                            <div style={tableCellStyle}>{userData.email}</div>
                            <div style={tableCellStyle}>
                                <span style={userData.role === 'admin' ? adminBadgeStyle : userBadgeStyle}>
                                    {userData.role}
                                </span>
                            </div>
                            <div style={tableCellStyle}>
                                <span style={userData.subscriptionStatus === 'active' ? activeBadgeStyle : inactiveBadgeStyle}>
                                    {userData.subscriptionStatus || 'inactive'}
                                </span>
                            </div>
                            <div style={tableCellStyle}>{userData.currentPlan || 'None'}</div>
                            <div style={tableCellStyle}>
                                <select
                                    value={userData.role}
                                    onChange={(e) => updateUserRole(userData.id, e.target.value)}
                                    style={selectStyle}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
                
                {users.length > 10 && (
                    <div style={showMoreStyle}>
                        <button style={showMoreButtonStyle}>
                            Show All {users.length} Users
                        </button>
                    </div>
                )}
            </div>

            {/* Recent Activity */}
            <div style={recentActivityStyle}>
                <h2 style={sectionTitleStyle}>Recent System Activity</h2>
                <div style={activityListStyle}>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>👤</div>
                        <div>
                            <div style={activityTitleStyle}>New User Registration</div>
                            <div style={activityTimeStyle}>Latest user joined the platform</div>
                        </div>
                    </div>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>🤖</div>
                        <div>
                            <div style={activityTitleStyle}>AI Recommendations Generated</div>
                            <div style={activityTimeStyle}>AI system processed user recommendations</div>
                        </div>
                    </div>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>💳</div>
                        <div>
                            <div style={activityTitleStyle}>Subscription Updates</div>
                            <div style={activityTimeStyle}>Users updated their subscription plans</div>
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
    backgroundColor: '#f1f5f9',
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
    fontSize: '2.5rem',
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

const metricsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
};

const metricCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    textAlign: 'center'
};

const metricIconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem'
};

const metricValueStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '0.5rem'
};

const metricLabelStyle = {
    color: '#64748b',
    fontSize: '1rem',
    fontWeight: '500'
};

const actionsGridStyle = {
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

const userManagementStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    marginBottom: '2rem'
};

const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: '1.5rem'
};

const userTableStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
};

const tableHeaderStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 0.8fr 0.8fr 1fr 1fr',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: '#374151'
};

const tableHeaderCellStyle = {
    fontSize: '0.875rem'
};

const tableRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 0.8fr 0.8fr 1fr 1fr',
    gap: '1rem',
    padding: '1rem',
    borderBottom: '1px solid #e5e7eb',
    alignItems: 'center'
};

const tableCellStyle = {
    fontSize: '0.875rem',
    color: '#374151'
};

const adminBadgeStyle = {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
};

const userBadgeStyle = {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
};

const activeBadgeStyle = {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
};

const inactiveBadgeStyle = {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500'
};

const selectStyle = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '0.875rem'
};

const showMoreStyle = {
    textAlign: 'center',
    marginTop: '1rem'
};

const showMoreButtonStyle = {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem'
};

const recentActivityStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
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

export default AdminDashboard;
