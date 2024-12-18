import EditProductPage from './pages/EditProductPage';
import ProductsPage from './pages/ProductsPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        {/* <Route path="/transactions" element={<TransactionPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
