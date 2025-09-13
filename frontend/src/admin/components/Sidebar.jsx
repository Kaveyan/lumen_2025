import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-lg border-r hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-blue-600">Admin Portal</h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-3">
        {[
          { label: 'Dashboard', path: '/admin' },
          { label: 'Manage Plans', path: '/admin/plans' },
          { label: 'Manage Discounts', path: '/admin/discounts' },
          { label: 'View Analytics', path: '/admin/analytics' },
          { label: 'Audit Logs', path: '/admin/audit' },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;