import React, { useState } from 'react';
import { Outlet } from "react-router-dom";

import { useLenis } from "../hooks/useLenis";

import Header from '../components/public/Header';
import CartDrawer from "../components/public/CartDrawer";
import SearchModal from "../components/public/SearchModal";

const PublicLayout = () => {
  useLenis();

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Passed onOpenSearch to match the new header */}
      <Header onOpenSearch={() => setSearchOpen(true)} />
      
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Overlays */}
      <CartDrawer />
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
};

export default PublicLayout;