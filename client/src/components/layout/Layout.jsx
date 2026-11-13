import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import { useLenis } from "../../hooks/useLenis";

export default function Layout() {
  useLenis();

  return (
    <div className="min-h-screen flex flex-col bg-white text-text">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}