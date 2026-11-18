import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutAdmin, selectAuthUser } from "../redux/slices/authSlice";
import { useAuthGuard } from "../hooks/useAuthGuard";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "📊", end: true },
  { to: "/admin/products", label: "Products", icon: "📦" },
  { to: "/admin/orders", label: "Orders", icon: "🧾" },
];

export default function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);

  useAuthGuard();

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-text text-bg fixed inset-y-0 left-0 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="text-xl font-bold text-secondary">
            Olison
          </Link>
          <p className="text-xs text-white/50 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition
                 ${
                   isActive
                     ? "bg-primary text-white"
                     : "text-white/70 hover:bg-white/10 hover:text-white"
                 }`
              }
            >
              <span>{n.icon}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-3">
          {user && (
            <div className="text-xs text-white/60">
              <p className="font-semibold text-white truncate">{user.email}</p>
              <p className="capitalize">{user.role}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-red-500 text-sm font-semibold transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-64 flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}