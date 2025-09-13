import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationTile = ({ label, link, icon }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(link)}
      className="cursor-pointer bg-white border rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md hover:bg-blue-50 transition"
    >
      <h4 className="text-lg font-semibold text-gray-800">{label}</h4>
      <span className="text-2xl">{icon}</span>
    </div>
  );
};

export default NavigationTile;