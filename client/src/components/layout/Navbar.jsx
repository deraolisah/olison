import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { selectCartCount, toggleCart } from "../../store/slices/cartSlice";
import { ShoppingBag } from "lucide-react";

import logo from "../../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const count = useSelector(selectCartCount);
  const dispatch = useDispatch();

  const links = [
    { to: "/about", label: "About" },
    { to: "/shop", label: "Shop" },
    { to: "/contact", label: "Locations" },
  ];

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-300
     after:absolute after:content-[''] after:w-full after:h-[1.8px]
     after:bg-primary after:top-[calc(100%+4px)] after:left-1/2
     after:origin-left after:transition-transform after:duration-300
     after:-translate-x-1/2
     ${isActive
       ? "text-primary after:scale-x-100"
       : "after:scale-x-0 hover:text-primary hover:after:scale-x-100"}`;

  return (
    <nav className="w-full h-16 bg-white sticky top-0 z-50 border-b border-primary/15">
      <div className="container-page h-full flex items-center justify-between flex-no-wrap gap-4 py-4 md:py-0">
        <div className="w-full flex items-center justify-between gap-4 md:gap-8">
          <Link to="/" className="text-primary text-base font-semibold uppercase tracking-wider">
            <img src={logo} alt="Olison Super Stores" className="object-cover w-8 h-fit" />
            {/* O.S.S  */}
          </Link>
        </div>

        <ul
          className={`flex items-center justify-center gap-6 flex-wrap w-full mx-auto
            max-md:flex-col max-md:items-start max-md:gap-8
            max-md:fixed max-md:top-16 max-md:left-0
            max-md:w-full max-md:h-screen max-md:p-8
            max-md:bg-white max-md:text-text
            max-md:transition-transform max-md:duration-500
            ${open ? "max-md:translate-x-0" : "max-md:translate-x-full"}`}
        >
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} onClick={() => setOpen(false)} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="w-full flex items-center justify-end gap-4">
          <button type="button" onClick={() => {dispatch(toggleCart()); setOpen(false); }} className="relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>

          <a className="hidden md:flex cta text-sm! rounded-full!" href="tel:0803312620">Contact Us</a>
          
          <button
            className="md:hidden flex flex-col gap-1.25 p-2"
            onClick={() => setOpen(!open)}
            aria-label="menu"
            aria-expanded={open}
          >
            <span className={`w-5 h-0.5 bg-text transition-transform duration-300 ${open ? "rotate-45 translate-y-1.75" : ""}`} />
            <span className={`w-5 h-0.5 bg-text transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-text transition-transform duration-300 ${open ? "-rotate-45 -translate-y-1.75" : ""}`} />
          </button>
        </div>
      </div>
    </nav>
  );
}