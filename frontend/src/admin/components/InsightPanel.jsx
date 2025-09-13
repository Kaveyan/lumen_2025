import React, { useState } from 'react';

const insights = [
  "Users on Copper Premium often exceed quota—consider upsell.",
  "Fibernet Gold engagement dropped 12%—review pricing.",
  "High churn on Starter plans—add onboarding incentives.",
];

const InsightPanel = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">AI-Powered Insights</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-blue-600 underline"
        >
          {expanded ? "Hide Tips" : "Show Tips"}
        </button>
      </div>
      {expanded && (
        <ul className="space-y-2 text-gray-700">
          {insights.map((tip, idx) => (
            <li key={idx}>🧠 {tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InsightPanel;