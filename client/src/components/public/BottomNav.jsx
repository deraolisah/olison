
import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Home,
  ShoppingBag,
  SlidersHorizontal,
  UserRound,
} from "lucide-react";

import {
  selectCartCount,
  setCartOpen,
} from "../../redux/slices/cartSlice";

export default function BottomNav({ onFilterClick, onCartClick  }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);

  const navList = [
    {
      navItem: "Home",
      href: "/",
      icon: Home,
      type: "link",
    },
    {
      navItem: "Filter",
      icon: SlidersHorizontal,
      type: "button",
      action: onFilterClick,
    },
    {
      navItem: "Cart",
      icon: ShoppingBag,
      type: "button",
      // action: () => dispatch(setCartOpen(true)),
      action: onCartClick,
      badge: cartCount,
    },
    {
      navItem: "Profile",
      href: "/profile",
      icon: UserRound,
      type: "link",
    },
  ];

  const itemClass =
    "relative flex flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium text-gray-500 transition-colors hover:text-primary";

  const activeClass = "text-primary";

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-4 left-1/2 z-50 flex w-full max-w-[90vw] -translate-x-1/2 items-center justify-between rounded-full border border-border bg-white/60 px-3 py-2 shadow-lg backdrop-blur-md md:hidden"
    >
      {navList.map((item) => {
        const Icon = item.icon;

        if (item.type === "button") {
          return (
            <button
              key={item.navItem}
              type="button"
              title={item.navItem}
              onClick={item.action}
              className={itemClass}
              aria-label={item.navItem}
            >
              <span className="relative">
                <Icon size={19} strokeWidth={1.8} />

                {item.badge > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                    {item.badge > 99 ? "99+" : item.badge}
                  </span>
                )}
              </span>

              {item.navItem}
            </button>
          );
        }

        return (
          <NavLink
            key={item.navItem}
            to={item.href}
            title={item.navItem}
            end={item.href === "/"}
            className={({ isActive }) =>
              `${itemClass} ${isActive ? activeClass : ""}`
            }
          >
            <Icon size={19} strokeWidth={1.8} />
            {item.navItem}
          </NavLink>
        );
      })}
    </nav>
  );
}
