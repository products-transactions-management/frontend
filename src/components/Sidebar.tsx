import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white fixed">
      <h1 className="text-2xl font-bold p-4 text-orange">Dashboard</h1>
      <ul>
        <li>
          <Link
            to="/"
            className="block p-4 hover:bg-gray-700 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className="block p-4 hover:bg-gray-700 transition"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/transactions"
            className="block p-4 hover:bg-gray-700 transition"
          >
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
