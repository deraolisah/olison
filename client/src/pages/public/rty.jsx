import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import FilterSidebar from "../../components/public/FilterSidebar";



import { setCartOpen, toggleCart } from "../../redux/slices/cartSlice";


export default function Home() {

  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Layout States

  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Example filter state (move this to Redux or Context if needed globally)
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: "",
    maxPrice: "",
    inStockOnly: false,
  });
  
  // Example categories array (replace with your API data)
  const categories = ["groceries", "drinks", "snacks", "fashion"];

  const handleReset = () => {
    setFilters({ category: "all", minPrice: "", maxPrice: "", inStockOnly: false });
  };

  const handleFilterClick = () => {
    setFilterOpen(prev => !prev);
  }

  return (
    <div className="flex min-h-screen w-full container-page px-0 bg-bg-alt text-text">
      {/* Left Sidebar for Filters */}
      <FilterSidebar 
        open={filterOpen} 
        onClose={() => setFilterOpen(false)} 
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 px-4 pb-28 md:pb-6">
        <Outlet context={{ handleFilterClick, filters, setFilters, handleSearchClick: () => setSearchOpen(true) }} />
      </main>
    </div>
  );
}