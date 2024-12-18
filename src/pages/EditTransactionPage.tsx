import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditTransactionPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    product_id: "",
    quantity: "",
    transaction_date: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await api.get(`/transactions/${id}`);
      setForm(response.data);
    };
    fetchTransaction();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/transactions/${id}`, {
        ...form, 
        quantity: Number(form.quantity),
        transaction_date: new Date(form.transaction_date).toISOString(),
    });
        alert('Transaction successfully updated!');
        navigate("/transactions");      
    } catch (error) {
        console.error("Failed to update transaction", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-orange">Edit Transaction</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">            
          <div className="flex flex-col">
            <span className="text-lg mb-2">Product ID</span>
            <input
                type="text"
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                placeholder="Product ID"
                className="p-2 border rounded bg-gray-300"
                required
                disabled={true}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg mb-2">Quantity</span>
            <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="p-2 border rounded"
                required
            />
            </div>

            <div className="flex flex-col">
                <span className="text-lg mb-2">Transaction Date</span>
                <input
                    type="date"
                    name="transaction_date"
                    value={form.transaction_date}
                    onChange={handleChange}
                    className="p-2 border rounded"                    
                />
            </div>
        </div>
        <button type="submit" className="mt-4 p-2 bg-orange text-white rounded">
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default EditTransactionPage;