import React from 'react';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import NavigationTile from './components/NavigationTile';
import ActivityFeed from './components/ActivityFeed';
import InsightPanel from './components/InsightPanel';
import '../styles/admin.css';
import ChartCard from './components/ChartCard';
import Sidebar from './components/Sidebar';
import PlanForm from './components/PlanForm';


const AdminHome = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-6 py-10 space-y-12">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Welcome, Admin 👋</h2>
          <p className="mt-2 text-lg text-gray-500">Here’s a snapshot of your subscription ecosystem.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Active Subscriptions" value="1,245" icon="📈" color="bg-green-100" />
          <StatCard title="Cancelled This Month" value="87" icon="❌" color="bg-red-100" />
          <StatCard title="Top Revenue Plan" value="Fibernet Gold" icon="💰" color="bg-yellow-100" />
          <StatCard title="AI Suggestions" value="3 new" icon="🧠" color="bg-blue-100" />
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NavigationTile label="Manage Plans" link="/admin/plans" icon="🔧" />
          <NavigationTile label="Manage Discounts" link="/admin/discounts" icon="🎁" />
          <NavigationTile label="View Analytics" link="/admin/analytics" icon="📊" />
          <NavigationTile label="Audit Logs" link="/admin/audit" icon="🧾" />
        </div>

        {/* Activity + Insights Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityFeed />
          <InsightPanel />
        </div>
      </div>
    </>
  );
};

export default AdminHome;