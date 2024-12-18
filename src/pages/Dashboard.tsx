import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-orange mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Transactions</h2>
          <p className="text-2xl font-bold">340</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">$12,500</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;