import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Ganti sesuai URL backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
