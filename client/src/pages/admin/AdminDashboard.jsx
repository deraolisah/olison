// src/pages/admin/AdminDashboard.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Package,
  AlertTriangle,
  Star,
  Wallet,
  Plus,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Users,
} from "lucide-react";
import { fetchProducts } from "../../redux/slices/productsSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const stats = [
    {
      label: "Total Products",
      value: items.length,
      icon: Package,
      tint: "from-blue-500 to-blue-600",
      sub: "Across all categories",
    },
    {
      label: "Low Stock",
      value: items.filter((p) => p.stock <= 10).length,
      icon: AlertTriangle,
      tint: "from-amber-500 to-orange-600",
      sub: "Items running low",
    },
    {
      label: "Featured",
      value: items.filter((p) => p.featured).length,
      icon: Star,
      tint: "from-purple-500 to-pink-600",
      sub: "On the storefront",
    },
    {
      label: "Inventory Value",
      value: `₦${items
        .reduce((s, p) => s + p.price * p.stock, 0)
        .toLocaleString()}`,
      icon: Wallet,
      tint: "from-emerald-500 to-teal-600",
      sub: "Total stock worth",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-serif text-gray-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          A quick overview of your store's performance
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    {s.label}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-[11px] text-gray-400">{s.sub}</p>
                </div>
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br ${s.tint} text-white shadow-md`}
                >
                  <Icon size={19} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two-column area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick actions */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <QuickAction
              icon={Plus}
              label="Add product"
              to="/admin/products"
              tint="bg-primary/10 text-primary"
            />
            <QuickAction
              icon={ShoppingBag}
              label="View orders"
              to="/admin/orders"
              tint="bg-blue-50 text-blue-600"
            />
            <QuickAction
              icon={Users}
              label="Customers"
              to="/admin/customers"
              tint="bg-purple-50 text-purple-600"
            />
            <QuickAction
              icon={Star}
              label="Storefront"
              to="/"
              tint="bg-emerald-50 text-emerald-600"
            />
          </div>

          {/* Recent products */}
          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                Recently Added
              </h3>
              <Link
                to="/admin/products"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-2">
              {items.slice(0, 4).map((p) => (
                <div
                  key={p.id || p._id}
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-2.5 hover:bg-gray-50"
                >
                  <img
                    src={p.productImage || p.image}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = "/img/placeholder.png";
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {p.category}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    ₦{Number(p.price).toLocaleString()}
                  </p>
                </div>
              ))}

              {items.length === 0 && (
                <p className="py-6 text-center text-sm text-gray-400">
                  No products yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Insight side panel */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-linear-to-br from-primary to-purple-700 p-5 text-white shadow-lg">
            <div className="mb-3 inline-flex rounded-lg bg-white/20 p-2">
              <TrendingUp size={18} />
            </div>
            <h3 className="text-lg font-semibold">Store Insights</h3>
            <p className="mt-1 text-sm text-white/80">
              {items.filter((p) => p.stock === 0).length} items are out of
              stock. Restock soon to keep customers happy.
            </p>
            <Link
              to="/admin/products"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-primary hover:bg-white/90"
            >
              Manage inventory <ArrowRight size={12} />
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Categories
            </h3>
            <div className="space-y-2">
              {[...new Set(items.map((p) => p.category))]
                .slice(0, 5)
                .map((cat) => {
                  const count = items.filter((p) => p.category === cat).length;
                  return (
                    <div key={cat}>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="capitalize text-gray-700">{cat}</span>
                        <span className="font-semibold text-gray-500">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${Math.min((count / Math.max(items.length, 1)) * 100 * 3, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, to, tint }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center gap-2 rounded-xl border border-gray-200 p-3 text-center transition hover:border-primary/30 hover:shadow-sm"
    >
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl ${tint} transition group-hover:scale-105`}
      >
        <Icon size={18} />
      </span>
      <span className="text-xs font-medium text-gray-700">{label}</span>
    </Link>
  );
}