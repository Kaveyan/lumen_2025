import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">Admin Portal</h1>
    <div className="space-x-4">
      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/plans">Plans</Link>
      <Link to="/admin/discounts">Discounts</Link>
      <Link to="/admin/analytics">Analytics</Link>
      <Link to="/admin/audit">Audit Logs</Link>
    </div>
  </nav>
);

export default Navbar;