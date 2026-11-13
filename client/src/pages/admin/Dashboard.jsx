import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../store/slices/productsSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const stats = [
    { label: "Total Products", value: items.length },
    {
      label: "Low Stock (≤10)",
      value: items.filter((p) => p.stock <= 10).length,
      highlight: "text-yellow-600",
    },
    {
      label: "Featured",
      value: items.filter((p) => p.featured).length,
      highlight: "text-primary",
    },
    {
      label: "Inventory Value",
      value: `₦${items
        .reduce((s, p) => s + p.price * p.stock, 0)
        .toLocaleString()}`,
      highlight: "text-green-600",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">
        Overview of your store inventory
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {s.label}
            </p>
            <p className={`text-3xl font-bold mt-2 ${s.highlight ?? "text-text"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/products" className="cta">Manage Products</Link>
          <Link to="/" className="btn-ghost">View Storefront</Link>
        </div>
      </div>
    </div>
  );
}