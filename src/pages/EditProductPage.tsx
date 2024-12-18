import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { AxiosError } from "axios";

const EditProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", type: "", stock: "" });

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await api.get(`/products/${id}`);
      if(!response.data) {
        alert("Product not found");
        navigate("/products");
        return;
      }
      setForm(response.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, {...form, stock: Number(form.stock)});
      alert("Product updated successfully");
      
      navigate("/products");
    } catch (error) {
      console.error("Failed to update product", error);
      if (error instanceof AxiosError) {
        alert(`Failed to update product\n${error.response?.data.error}`);
        return;
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-orange">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Product Type"
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="mt-4 p-2 bg-orange text-white rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
