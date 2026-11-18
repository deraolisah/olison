
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  UserRound,
  SlidersHorizontal
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, toggleCart } from "../../redux/slices/cartSlice";

export default function Header({ onMenuClick, onFilterClick }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
    const [open, setOpen] = useState(false);
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();


  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="flex md:sticky top-0 z-20 h-14 items-center justify-between gap-6 px-5 sm:px-8 xl:px-10 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="w-full flex items-center justify-between gap-3">
        {/* <button onClick={onMenuClick} aria-label="Open navigation" className="p-2 rounded-full bg-gray-200 flex md:hidden">
          <Menu size={20} strokeWidth={1.5} />
        </button> */}

        <div className="flex md:hidden items-center gap-2 flex-1">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">O</span>
          </div>
          <Link to="/" className="flex flex-col items-start">
            <p className="font-bold text-lg text-primary tracking-wider leading-tight uppercase">Olison</p>
            <p className="text-[9px] tracking-wider text-text uppercase">
              Super Stores
            </p>
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex items-center md:w-65 xl:w-90 h-10 p-0">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="hidden md:flex w-full h-full outline-none px-4 font-light text-base text-gray-800 placeholder:text-gray-400 bg-gray-50 border border-gray-300 rounded-l-full focus:border-primary"
          />

          <button type="submit" aria-label="Search products" className="hidden md:flex items-center justify-center h-full px-2.5 md:pr-3.5 bg-gray-100 hover:bg-gray-200 border md:border-l-0! border-gray-300 text-text transition rounded-full md:rounded-l-none">
            <Search size={18} className="shrink-0" />
          </button>

          <button type="button" aria-label="Open Search" onClick={() => {}} className="flex md:hidden items-center justify-center h-full px-2.75 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-text transition rounded-full">
            <Search size={18} className="shrink-0" />
          </button>
        </form>

        <div className="hidden md:flex items-center gap-2">
          <button type="button" title="Filter" onClick={onFilterClick} aria-label="Open product filters" className="p-2 hover:bg-gray-200 rounded-full">
            <SlidersHorizontal size={18} strokeWidth={1.5} />
          </button>

          <button type="button" title="Cart" onClick={() => {dispatch(toggleCart()); setOpen(false); }} aria-label="Open Cart" className="relative p-2 hover:bg-gray-200 rounded-full">
              <ShoppingBag size={20} strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                {count}
                </span>
              )}
          </button>

          <Link
            to="/profile"
            title="Account"
            aria-label="Customer account"
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <UserRound size={20} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
