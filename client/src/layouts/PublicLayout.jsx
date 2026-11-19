
import { useState, useEffect } from "react";
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

  // useEffect(() => {
  //   document.body.style.overflowY = filtersOpen ? "hidden" : "auto";

  //   return () => {
  //     document.body.style.overflowY = "auto";
  //   };
  // }, [filtersOpen]);

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
    <div className="min-h-screen bg-white text-gray-900">
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />

      <div className="min-h-screen lg:ml-67.5 flex flex-col bg-bg-alt">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onFilterClick={handleFilterClick}
        />

        <BottomNav 
          onFilterClick={handleFilterClick} 
          onCartClick={handleCartClick}
        />

        <main className="flex-1 min-w-0">
          <Outlet
            context={{
              filtersOpen,
              setFiltersOpen,
            }}
          />
        </main>
      </div>

      <CartDrawer />
    </div>
  );
}
