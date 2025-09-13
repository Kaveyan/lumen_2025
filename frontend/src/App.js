import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// User Components
import Navbar from './User/components/Navbar';
import Footer from './User/components/Footer';

// User Pages
import Home from './User/pages/Home';
import Login from './User/pages/Login';
import Register from './User/pages/Register';
import Profile from './User/pages/Profile';
import Plans from './User/pages/Plans';
import PlanDetails from './User/pages/PlanDetails';
import MySubscriptions from './User/pages/MySubscriptions';
import UpgradeDowngrade from './User/pages/UpgradeDowngrade';
import CancelRenew from './User/pages/CancelRenew';
import Recommendations from './User/pages/Recommendations';
import Discounts from './User/pages/Discounts';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/plans/:id" element={<PlanDetails />} />
            <Route path="/my-subscriptions" element={<MySubscriptions />} />
            <Route path="/upgrade-downgrade" element={<UpgradeDowngrade />} />
            <Route path="/cancel-renew" element={<CancelRenew />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/discounts" element={<Discounts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
