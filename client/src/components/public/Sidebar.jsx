
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Info,
  Phone,
  Heart,
  Clock3,
  ChevronRight,
  Package,
  Coffee,
  Sparkles,
  Baby,
  House,
  Wine,
  Gift,
  X,
} from "lucide-react";

const mainLinks = [
  { name: "Home", path: "/", icon: Home, end: true },
  // { name: "HomePage", path: "/home", icon: Home, end: true },
  // { name: "Shop All", path: "/shop", icon: ShoppingBag },
  { name: "About Us", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
];

const categories = [
  { name: "Groceries", icon: Package },
  { name: "Food & Provisions", icon: Coffee },
  { name: "Drinks & Beverages", icon: Wine },
  { name: "Cosmetics", icon: Sparkles },
  { name: "Baby & Dairy", icon: Baby },
  { name: "Household Items", icon: House },
  { name: "Personal Care", icon: Gift },
];

export default function Sidebar({ open, onClose }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
      isActive
        ? "bg-gray-200 text-text font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-black"
    }`;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-67.5 bg-white border-r border-gray-100
          flex flex-col
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="h-15 px-6 flex items-center justify-between border-b border-border">
          <Link to="/" onClick={onClose} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">O</span>
            </div>

            <div className="flex flex-col items-start">
              <h2 className="font-bold text-lg tracking-wider text-primary uppercase">
                Olison
              </h2>
              <p className="text-[9px] text-text tracking-wide uppercase leading-2">
                Super Stores
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div data-lenis-prevent className="overflow-y-auto px-4 py-6">
          <nav className="space-y-1">
            {mainLinks.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={linkClass}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="my-7 border-t border-gray-100" />

          <div className="flex items-center justify-between px-3 mb-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">
              Shop Categories
            </p>
            <ChevronRight size={15} className="text-gray-400" />
          </div>

          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  to={`/shop?category=${encodeURIComponent(category.name)}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-100 hover:text-black transition-colors"
                >
                  <Icon size={18} />
                  <span>{category.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="my-7 border-t border-gray-100" />

          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">
            Quick Access
          </p>

          <Link
            to="/checkout"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-gray-600 hover:bg-gray-100"
          >
            <ShoppingBag size={18} />
            Checkout
          </Link>
        </div>

        {/* Sidebar footer */}
        {/* <div className="p-5 border-t border-gray-100">
          <div className="bg-gray-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-gray-700" />
              <span className="text-sm font-semibold">
                Shopping made easy
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-500">
              Find your everyday essentials and shop all your favourite
              products in one place.
            </p>
          </div>

          <p className="text-[10px] text-gray-400 mt-5 text-center">
            © {new Date().getFullYear()} Olison Super Stores
          </p>
        </div> */}
      </aside>
    </>
  );
}
