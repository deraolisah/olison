import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingBag,
  Heart,
  X,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartCount, toggleCart } from "../../redux/slices/cartSlice";

export default function Header({ onOpenSearch }) {
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen((prev) => !prev);
  };

  const wishlistCount = 0;

  return (
    <header className="sticky top-0! z-20 w-full h-14 p-0! border-b border-border bg-white">
      <div className="container-page h-full flex items-center justify-between">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center justify-start gap-2 shrink-0">
          <button
            onClick={handleMenuClick}
            className="p-2 -ml-0.75 rounded-full hover:bg-gray-100 lg:hidden"
            aria-label="Open Menu"
          >
            {menuOpen ? (
              <X size={18} strokeWidth={1.5} />
            ) : (
              <Menu size={18} strokeWidth={1.25} />
            )}
          </button>

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-7 w-7 md:h-9 md:w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-white">O</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <p className="text-base font-bold uppercase leading-tight tracking-wider text-primary">
                Olison
              </p>
              <p className="text-[9px] uppercase leading-tight tracking-wide">
                Super Stores
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Desktop Search Bar (Inspired by screenshot) */}
        {/* <div className="hidden md:flex flex-1 max-w-xl mx-8">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center gap-3 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors text-sm"
          >
            <Search size={16} />
            <span>Search products...</span>
          </button>
        </div> */}

        {/* Navigation Links (Moved for mobile context) */}
        <nav
          className={`absolute top-14 left-0 p-4 flex-col items-start bg-bg hidden md:relative md:flex md:top-auto md:left-auto md:flex-row md:items-center md:p-0 md:bg-transparent gap-8 text-sm font-medium text-text/80 ${
            menuOpen ? "flex!" : "hidden"
          }`}
        >
          <Link to="/" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center justify-end gap-1 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={18} strokeWidth={1.25} />
          </button>
          

          <Link
            to="/wishlist"
            className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-gray-100 transition-colors"
          >
            <Heart size={18} strokeWidth={1.25} />
            {wishlistCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => dispatch(toggleCart())}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-text hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.25} />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}