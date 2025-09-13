import React, { useState } from 'react';

const PlanForm = ({ setPlans }) => {
  const [form, setForm] = useState({ name: '', quota: '', price: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlans(prev => [...prev, { ...form, id: Date.now() }]);
    setForm({ name: '', quota: '', price: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 items-center">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Plan Name" className="border p-2" required />
      <input name="quota" value={form.quota} onChange={handleChange} placeholder="Quota" className="border p-2" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Plan</button>
    </form>
  );
};

export default PlanForm;