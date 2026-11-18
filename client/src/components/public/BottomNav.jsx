import { Home, Settings, ShoppingBag } from 'lucide-react';
import React from 'react';
import { Link } from "react-router-dom";

export default function BottomNav() {

  const navList = [
    {navItem: "Home ", href: "/", icon: <Home size={16} /> },
    {navItem: "shop", href: "/shop", icon: <ShoppingBag size={16} /> },
    {navItem: "Profile ", href: "/profile", icon: <Settings size={16} /> },
  ]


  return (
    <nav className="flex md:hidden items-center justify-center w-full max-w-[90%] mx-auto! fixed z-100 bottom-4 left-1/2 -translate-x-1/2 border border-border bg-white/60 backdrop-blur-md p-3 rounded-full">
      {navList.map((item, index) => (
        <Link to={item.href} key={index} className="w-full flex flex-col items-center text-xs">
          <span className="">
            {item.icon}
          </span>
          {item.navItem}
        </Link>
      ))}
    </nav>
  )
}
