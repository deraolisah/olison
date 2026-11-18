
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/public/Sidebar";
import Header from "../components/public/Header";
import BottomNav from "../components/public/BottomNav";
import Footer from "../components/public/Footer";
import CartDrawer from "../components/public/CartDrawer";

import { useLenis } from "../hooks/useLenis";

export default function PublicLayout() {
  useLenis();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if(filtersOpen){
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [filtersOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Sidebar open={sidebarOpen} onClose={closeSidebar} />


      {/* Main content */}
      <div className="min-h-screen lg:ml-67.5 flex flex-col bg-gray-100">
        <Header onMenuClick={() => setSidebarOpen(true)} onFilterClick={() => setFiltersOpen(true)} />

        <BottomNav />

        <main className="flex-1 min-w-0">
          <Outlet context={{filtersOpen, setFiltersOpen, }} />
        </main>

        {/* <Footer /> */}
      </div>

      <CartDrawer />
    </div>
  );
}
