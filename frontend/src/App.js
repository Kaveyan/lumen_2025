import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import './App.css';

// Import contexts
import { AuthProvider } from './contexts/AuthContext';

// Import components
import Navbar from './User/components/Navbar';
import Footer from './User/components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './User/pages/Home';
import Plans from './User/pages/Plans';
import Login from './User/pages/Login';
import Register from './User/pages/Register';
import Profile from './User/pages/Profile';
import MySubscriptions from './User/pages/MySubscriptions';
import PlanDetails from './User/pages/PlanDetails';
import UpgradeDowngrade from './User/pages/UpgradeDowngrade';
import CancelRenew from './User/pages/CancelRenew';
import Discounts from './User/pages/Discounts';
import Recommendations from './User/pages/Recommendations';
import Dashboard from './User/pages/Dashboard';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminRecommendations from './admin/pages/AdminRecommendations';
import PaymentHistory from './admin/pages/PaymentHistory';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/my-subscriptions" element={
                  <ProtectedRoute>
                    <MySubscriptions />
                  </ProtectedRoute>
                } />
                <Route path="/plan-details/:planId" element={
                  <ProtectedRoute>
                    <PlanDetails />
                  </ProtectedRoute>
                } />
                <Route path="/upgrade-downgrade" element={
                  <ProtectedRoute>
                    <UpgradeDowngrade />
                  </ProtectedRoute>
                } />
                <Route path="/cancel-renew" element={
                  <ProtectedRoute>
                    <CancelRenew />
                  </ProtectedRoute>
                } />
                <Route path="/discounts" element={
                  <ProtectedRoute>
                    <Discounts />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations" element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                } />
                
                {/* Admin only routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/recommendations" element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminRecommendations />
                  </ProtectedRoute>
                } />
                <Route path="/admin/payments" element={
                  <ProtectedRoute adminOnly={true}>
                    <PaymentHistory />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
