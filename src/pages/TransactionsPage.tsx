import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

interface Transaction {
  id: string;
  product_id: string;
  product_name?: string;
  quantity: number;
  transaction_date: string;
}

interface Product {
    id: string;
    name: string;
}

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    transaction_date: "",
  });
  const [filters, setFilters] = useState({
    sort_by_date: "asc",
    date_start: "",
    date_end: "",
    quantity_min: "",
    quantity_max: "",
  });

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions", { params: filters });
      const transactionsWithNames = response.data.map((transaction: Transaction) => {
        const product = products.find((p) => p.id === transaction.product_id);
        return {
          ...transaction,
          product_name: product ? product.name : "Unknown",
        };
      });
      setTransactions(transactionsWithNames);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) fetchTransactions();
  }, [products, filters]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle submit (Create Transaction)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/transactions", {
        ...form, 
        quantity: Number(form.quantity), 
        product_id: Number(form.product_id),
        transaction_date: new Date(form.transaction_date).toISOString(),
    });
      setForm({ product_id: "", quantity: "", transaction_date: "" });
      
      fetchTransactions();
      alert("Transaction successfully created!");

    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          alert("Failed to create transaction\nBad Request");
          return;
        }

        if (error instanceof AxiosError && error.response?.data.stock === 0) {
            alert("Failed to create transaction\nProduct out of stock");
            return;
        }

      alert("Failed to create transaction\nInternal Server Error");
    }
  };

  // Handle filter input
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
        const userConfirmed = confirm(`Yakin menghapus transaksi terpilih?`);
        if (!userConfirmed) return;
        
        await api.delete(`/transactions/${id}`);
        fetchTransactions();
    } catch (error) {
        console.error("Failed to delete transaction", error);
        alert('Failed to delete transaction\nCheckout to console for details information.')
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-orange">Transactions Page</h1>

      {/* Form Create Transaction */}
      <form onSubmit={handleSubmit} className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-[#0d0d0d]">Create New Transaction:</h2>
        <div className="grid grid-cols-3 gap-4">
        <select
            name="product_id"
            value={form.product_id}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="transaction_date"
            value={form.transaction_date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-orange text-white rounded">
          Add Transaction
        </button>
      </form>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label>Sort by Date:</label>
          <select
            name="sort_by_date"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label>Filter Date Range:</label>
          <input
            type="date"
            name="date_start"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date_end"
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <label>Filter Quantity Range:</label>
          <input
            type="number"
            name="quantity_min"
            onChange={handleFilterChange}
            placeholder="Min"
            className="p-2 border rounded"
          />
          <input
            type="number"
            name="quantity_max"
            onChange={handleFilterChange}
            placeholder="Max"
            className="p-2 border rounded"
          />
        </div>
      </div>

      {/* Table Show Transactions */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-orange text-white">
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Transaction Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-100 text-center">
              <td className="border p-2 text-start">{transaction.product_name}</td>
              <td className="border p-2">{transaction.quantity}</td>
              <td className="border p-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
              <td className="border p-2">
                <Link
                  to={`/transactions/edit/${transaction.id}`}
                  className="text-blue-500 mr-2 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
