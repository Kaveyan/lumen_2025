import React from 'react';
import Navbar from './components/Navbar';
import ChartCard from './components/ChartCard';

const Dashboard = () => (
  <>
    <Navbar />
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartCard title="Top Plans This Month" />
      <ChartCard title="Subscription Trends" />
    </div>
  </>
);

export default Dashboard;