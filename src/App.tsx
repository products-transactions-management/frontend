import Dashboard from './pages/Dashboard';
import EditProductPage from './pages/EditProductPage';
import ProductsPage from './pages/ProductsPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from './pages/RootPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
