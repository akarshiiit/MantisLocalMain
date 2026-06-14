import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProdutDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/products" element={<Products />} />

      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default AppRoutes;