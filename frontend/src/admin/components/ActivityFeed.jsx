import React from 'react';

const activities = [
  "Updated pricing for Fibernet Basic",
  "Created seasonal discount: Autumn Boost",
  "Deleted Copper Starter plan",
  "Viewed analytics for August",
];

const ActivityFeed = () => (
  <div className="bg-white rounded-lg shadow-md p-5">
    <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Admin Activity</h3>
    <ul className="space-y-2 text-gray-700">
      {activities.map((item, idx) => (
        <li key={idx} className="flex items-start">
          <span className="mr-2 text-blue-500">•</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityFeed;