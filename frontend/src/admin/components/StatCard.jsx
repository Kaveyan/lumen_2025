const StatCard = ({ title, value, icon, color }) => (
  <div className={`shadow-md rounded p-4 flex items-center justify-between ${color}`}>
    <div>
      <h4 className="text-sm text-gray-600">{title}</h4>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    <div className="text-3xl">{icon}</div>
  </div>
);
export default StatCard;