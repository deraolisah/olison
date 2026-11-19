import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { status, error, searchQuery, categoryFilter } = useSelector((s) => s.products);
  const products = useSelector(selectFilteredProducts);

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
    // const res = await dispatch(deleteProduct(deleting.id));

    if (res.meta.requestStatus === "fulfilled") {
      showToast("Product deleted");
    }
    setDeleting(null);
  };

  const stats = useMemo(() => {
    const all = useSelector ? [] : null; // placeholder
    return null;
  }, []);

  return (
    <div className="p-8">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-serif text-text">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your store inventory
          </p>
        </div>
        <button className="cta" onClick={openCreate}>
          + Add Product
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          className="input md:max-w-sm"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <select
          className="input md:max-w-xs"
          value={categoryFilter}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {status === "loading" && (
        <div className="text-center py-20 text-gray-400">Loading products…</div>
      )}
      {status === "failed" && (
        <div className="text-red-600 p-4 bg-red-50 rounded">{error}</div>
      )}

      {status === "succeeded" && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
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
                <tr key={p.id || p._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.productImage}
                        alt=""
                        className="w-12 h-12 rounded object-cover bg-gray-100"
                        onError={(e) => { e.target.src = "/img/placeholder.png"; }}
                      />
                      <div>
                        <p className="font-semibold text-text line-clamp-1">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-400"> #{String(p.id || p._id).slice(0, 6)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">
                    ₦{Number(p.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        p.stock > 10
                          ? "bg-green-100 text-green-700"
                          : p.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="text-primary font-medium hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleting(p)}
                      className="text-red-600 font-medium hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              No products match your filter.
            </div>
          )}
        </div>
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