import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Sidebar from "../components/public/Sidebar";
import Header from "../components/public/Header";
import BottomNav from "../components/public/BottomNav";
import CartDrawer from "../components/public/CartDrawer";

import { setCartOpen, toggleCart } from "../redux/slices/cartSlice";
import { useLenis } from "../hooks/useLenis";

export default function PublicLayout() {
  useLenis();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  const handleFilterClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(setCartOpen(false));
    setFiltersOpen(!filtersOpen);
  };

  const handleCartClick = () => {
    setFiltersOpen(false);
    dispatch(toggleCart());
  };

  return (
    <div className="min-h-screen bg-bg-alt text-text">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Content is offset from the floating sidebar on desktop */}
      <div className="flex min-h-screen flex-col lg:pl-67">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onFilterClick={handleFilterClick}
        />

        <BottomNav
          onFilterClick={handleFilterClick}
          onCartClick={handleCartClick}
        />

        <main className="flex-1 min-w-0 pb-28 md:pb-6">
          <Outlet context={{ filtersOpen, setFiltersOpen }} />
        </main>
      </div>

      <CartDrawer />
    </div>
  );
}