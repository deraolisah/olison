// src/layouts/AdminLayout.jsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Store,
  Users,
  BarChart3,
  Tag,
  Bell,
} from "lucide-react";
import { logoutAdmin, selectAuthUser } from "../redux/slices/authSlice";
import { useAuthGuard } from "../hooks/useAuthGuard";

const navSections = [
  {
    label: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Store",
    items: [
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/orders", label: "Orders", icon: ReceiptText },
      { to: "/admin/customers", label: "Customers", icon: Users },
      { to: "/admin/categories", label: "Categories", icon: Tag },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useAuthGuard();

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          bg-gray-950 text-gray-300 border-r border-white/5
          transition-all duration-300 ease-out
          ${collapsed ? "lg:w-20" : "lg:w-64"}
          ${mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo / Brand */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
          {/* <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-primary to-primary-dark text-white font-bold">
              O
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">Olison</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Admin
                </p>
              </div>
            )}
          </Link> */}

          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 flex-1">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center"
          >
              <span className="text-white text-2xl font-bold shrink-0">O</span>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold text-lg text-primary tracking-wider leading-tight uppercase">Olison</p>
              <p className="text-[9px] tracking-wider text-subtle uppercase">
                Super Stores
              </p>
            </div>
          </Link>

          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-lg p-1.5 hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-6">
          {navSections.map((section) => (
            <div key={section.label}>
              {!collapsed && (
                <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                  {section.label}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <NavItem
                    key={item.to}
                    item={item}
                    collapsed={collapsed}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-white/5 p-3 space-y-2">
          {!collapsed && user && (
            <div className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3 py-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-primary font-semibold">
                {user.email?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">
                  {user.name || user.email}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  {user.role}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className={`
              flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm
              text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut size={17} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="
            hidden lg:flex absolute -right-3 top-20
            h-6 w-6 items-center justify-center
            rounded-full bg-white text-gray-700 shadow-lg
            border border-gray-200 hover:bg-gray-50
          "
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      </aside>

      {/* Main content */}
      <div
        className={`
          flex min-h-screen flex-col transition-all duration-300
          ${collapsed ? "lg:pl-20" : "lg:pl-64"}
        `}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/80 px-4 sm:px-6 backdrop-blur-md">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base">
              Admin Console
            </h2>
            <p className="hidden text-xs text-gray-500 sm:block">
              Manage your Olison Super Stores
            </p>
          </div>

          <button className="relative rounded-lg p-2 hover:bg-gray-100">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
          </button>

          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <Store size={14} />
            Storefront
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ item, collapsed, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        `
        group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition
        ${
          isActive
            ? "bg-primary text-white shadow-lg shadow-primary/20"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
        ${collapsed ? "justify-center" : ""}
        `
      }
    >
      <Icon size={18} className="shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}