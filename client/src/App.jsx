
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// 
import PublicLayout from "./layouts/PublicLayout";
import ProductLayout from "./layouts/ProductLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";
import AccountLayout from "./layouts/AccountLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";


// 
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Shop from "./pages/public/Shop";
import Contact from "./pages/public/Contact";
import ProductDetail from "./pages/public/ProductDetail";
import Checkout from "./pages/Checkout";


// 
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";


// Notfound
import Notfound from "./pages/Notfound.jsx";

export default function App() {
  return (
    <Routes>
      {/* Main storefront */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Product details */}
      <Route element={<ProductLayout />}>
        <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      {/* Checkout */}
      <Route element={<CheckoutLayout />}>
        <Route path="/checkout" element={<Checkout />} />
      </Route>

      {/* Customer account */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AccountLayout />}>
          {/* Add profile and order routes here */}
        </Route>
      </Route>

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>
    </Routes>
  );
}