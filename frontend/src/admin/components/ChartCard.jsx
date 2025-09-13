import React from 'react';

const ChartCard = ({ title }) => (
  <div className="bg-white shadow-md rounded p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <div className="h-40 flex items-center justify-center text-gray-400">
      {/* Replace with chart later */}
      [Chart Placeholder]
    </div>
  </div>
);

export default ChartCard;