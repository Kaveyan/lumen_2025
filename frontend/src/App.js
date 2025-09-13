import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './User/components/Navbar';
import Footer from './User/components/Footer';

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

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-subscriptions" element={<MySubscriptions />} />
            <Route path="/plan-details/:planId" element={<PlanDetails />} />
            <Route path="/upgrade-downgrade" element={<UpgradeDowngrade />} />
            <Route path="/cancel-renew" element={<CancelRenew />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
