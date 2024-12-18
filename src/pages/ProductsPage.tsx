import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

interface Product {
  id: string;
  name: string;
  type: string;
  stock: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: "", type: "", stock: "" });
  const [search, setSearch] = useState("");
  const [sortByName, setSortByName] = useState("asc");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products", {
        params: { search, sort_by_name: sortByName },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, sortByName]);

  // Handle form input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle submit (Create Product)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {      
      await api.post("/products", {...form, stock: Number(form.stock)});
      setForm({ name: "", type: "", stock: "" });
      fetchProducts();

      alert('Product added successfully');
    } catch (error) {
      console.error("Failed to create product", error);
      if (error instanceof AxiosError) {
          alert(`Failed to update product\n${error.response?.data.error}`);
          return;
      }
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
      if (error instanceof AxiosError && error.response?.status === 500) {
        alert(`Failed to delete product\n
          Product ini berelasi dengan Transaksi\n
          Cobalah untuk menghapus Product lain, atau\n
          Hapuslah Transaksi terlebih dahulu`);
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-orange">Product Page</h1>
      {/* Form Create Product */}
      <form onSubmit={handleSubmit} className="mb-6">
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
          Add Product
        </button>
      </form>

      {/* Search and Sort */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name or Type"
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          onChange={(e) => setSortByName(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="asc">Sort by Name (Asc)</option>
          <option value="desc">Sort by Name (Desc)</option>
        </select>        
      </div>

      {/* Table Show Products */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-orange text-white">
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.type}</td>
              <td className="border p-2">{product.stock}</td>
              <td className="border p-2">
                <Link
                  to={`/products/edit/${product.id}`}
                  className="text-blue-500 mr-2 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
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

export default ProductsPage;
