// src/pages/admin/AdminProducts.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react";
import {
  fetchProducts,
  deleteProduct,
  selectFilteredProducts,
  setSearch,
  setCategoryFilter,
} from "../../redux/slices/productsSlice";
import ProductFormModal from "../../components/admin/ProductFormModal";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import Toast from "../../components/admin/Toast";

const categories = [
  "cosmetics", "groceries", "toiletries", "fashion", "bakery", "drinks",
  "household", "baby", "frozen", "electronics", "furniture", "gym",
];

export default function AdminProducts() {
  const dispatch = useDispatch();
  const { status, error, searchQuery, categoryFilter } = useSelector(
    (s) => s.products
  );
  const products = useSelector(selectFilteredProducts);

  const [view, setView] = useState("table"); // "table" | "grid"
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setModalOpen(true); };

  const handleDelete = async () => {
    const id = deleting.id || deleting._id;
    const res = await dispatch(deleteProduct(id));
    if (res.meta.requestStatus === "fulfilled") showToast("Product deleted");
    setDeleting(null);
  };

  const stockBadge = (stock) => {
    if (stock > 10) return "bg-emerald-50 text-emerald-700";
    if (stock > 0) return "bg-amber-50 text-amber-700";
    return "bg-red-50 text-red-700";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 sm:text-3xl">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {products.length} products across {categories.length} categories
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3">
        {/* Search */}
        <div className="relative flex-1 min-w-50">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:bg-white"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
        </div>

        {/* Category */}
        <div className="relative">
          <Filter
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <select
            className="rounded-xl border border-gray-200 bg-gray-50 py-2 pl-8 pr-8 text-sm outline-none transition focus:border-primary focus:bg-white"
            value={categoryFilter}
            onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* View toggle */}
        <div className="ml-auto flex items-center rounded-xl border border-gray-200 bg-gray-50 p-0.75">
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              view === "table"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Table view"
          >
            <List size={14} />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              view === "grid"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={14} />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* States */}
      {status === "loading" && (
        <div className="py-20 text-center text-gray-400">
          Loading products…
        </div>
      )}
      {status === "failed" && (
        <div className="rounded-xl bg-red-50 p-4 text-red-600">{error}</div>
      )}

      {/* Table view */}
      {status === "succeeded" && view === "table" && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-[11px] uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id || p._id} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.productImages?.[0] || "/img/placeholder.png"}
                          alt=""
                          className="h-11 w-11 rounded-lg bg-gray-100 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/img/placeholder.png";
                          }}
                        />
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-400">
                            #{String(p.id || p._id).slice(0, 6)}
                            {p.productImages?.length > 1 && (
                              <span className="ml-1 text-[10px] text-primary">
                                · {p.productImages.length} imgs
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      ₦{Number(p.price).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${stockBadge(p.stock)}`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-primary/10 hover:text-primary"
                          aria-label="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleting(p)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              No products match your filter.
            </div>
          )}
        </div>
      )}

      {/* Grid view */}
      {status === "succeeded" && view === "grid" && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.map((p) => (
              <div
                key={p.id || p._id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={p.productImages?.[0] || "/img/placeholder.png"}
                    alt={p.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "/img/placeholder.png";
                    }}
                  />

                  {/* image count badge */}
                  {p.productImages?.length > 1 && (
                    <span className="absolute right-2 top-2 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      {p.productImages.length}
                    </span>
                  )}

                  {/* Featured */}
                  {p.featured && (
                    <span className="absolute left-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                      ★ Featured
                    </span>
                  )}

                  {/* Hover actions */}
                  <div className="absolute inset-0 flex items-end justify-end gap-1 bg-linear-to-t from-black/40 to-transparent p-2 opacity-0 transition group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(p)}
                      className="rounded-lg bg-white p-1.5 text-gray-700 shadow hover:bg-primary hover:text-white"
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleting(p)}
                      className="rounded-lg bg-white p-1.5 text-gray-700 shadow hover:bg-red-500 hover:text-white"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium text-gray-900">
                    {p.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-gray-400">
                    {p.category}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      ₦{Number(p.price).toLocaleString()}
                    </p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${stockBadge(p.stock)}`}
                    >
                      {p.stock}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center text-gray-400">
              No products match your filter.
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {modalOpen && (
        <ProductFormModal
          product={editing}
          onClose={() => setModalOpen(false)}
          onSuccess={(msg) => showToast(msg)}
        />
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete product?"
          message={`"${deleting.name}" will be permanently removed.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(null)}
        />
      )}

      {toast && <Toast {...toast} />}
    </div>
  );
}