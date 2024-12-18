import Dashboard from './pages/Dashboard';
import EditProductPage from './pages/EditProductPage';
import ProductsPage from './pages/ProductsPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootPage from './pages/RootPage';
import TransactionsPage from './pages/TransactionsPage';
import EditTransactionPage from './pages/EditTransactionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />

          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transactions/edit/:id" element={<EditTransactionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
