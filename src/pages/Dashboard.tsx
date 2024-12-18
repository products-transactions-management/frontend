import React, { useEffect } from "react";
import api from "../services/api";

const Dashboard: React.FC = () => {
    const [totalProducts, setTotalProducts] = React.useState<number>(0);
    const [totalTransactions, setTotalTransactions] = React.useState<number>(0);

    const fetchTransactions = async () => {
        try {
            const response = await api.get("/transactions");
            setTotalTransactions(response.data.length);
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        }
    }
    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setTotalProducts(response.data.length);
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchProducts();
    }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-orange mb-4">Welcome to Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Transactions</h2>
          <p className="text-2xl font-bold">{totalTransactions}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Revenue</h2>
          <p className="text-2xl font-bold">$12,500 <span className="text-lg italic font-normal">(It's fake data)</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;