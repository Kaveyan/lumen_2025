import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PlanForm from './components/PlanForm';

const PlanManager = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Fibernet Basic', quota: '100GB', price: '$20' },
    { id: 2, name: 'Copper Premium', quota: '200GB', price: '$30' },
  ]);

  const handleDelete = (id) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Manage Plans</h2>
        <PlanForm setPlans={setPlans} />
        <table className="w-full mt-6 border">
          <thead className="bg-gray-100">
            <tr>
              <th>Name</th>
              <th>Quota</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id} className="text-center border-t">
                <td>{plan.name}</td>
                <td>{plan.quota}</td>
                <td>{plan.price}</td>
                <td>
                  <button onClick={() => handleDelete(plan.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PlanManager;