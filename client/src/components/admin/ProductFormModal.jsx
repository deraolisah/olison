import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  createProduct,
  updateProduct,
} from "../../redux/slices/productsSlice";

const categories = [
  "cosmetics", "groceries", "toiletries", "fashion", "bakery", "drinks",
  "household", "baby", "frozen", "electronics", "furniture", "gym",
];

const emptyForm = {
  name: "",
  price: "",
  stock: "",
  category: "groceries",
  image: "",
  description: "",
  featured: false,
};

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const isEdit = Boolean(product);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        price: product.price ?? "",
        stock: product.stock ?? "",
        category: product.category ?? "groceries",
        image: product.image ?? "",
        description: product.description ?? "",
        featured: Boolean(product.featured),
      });
    }
  }, [product]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || Number(form.price) <= 0) e.price = "Price must be > 0";
    if (form.stock === "" || Number(form.stock) < 0) e.stock = "Stock can't be negative";
    if (!form.image.trim()) e.image = "Image URL required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    let res;
    if (isEdit) {
      res = await dispatch(updateProduct({ id: product.id, data: payload }));
    } else {
      res = await dispatch(createProduct(payload));
    }

    setSaving(false);
    if (res.meta.requestStatus === "fulfilled") {
      onSuccess(isEdit ? "Product updated" : "Product created");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-serif">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-text"
          >
            ×
          </button>
        </div>

        <div>
          <label className="label">Product Name *</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Price (₦) *</label>
            <input
              type="number"
              className="input"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
            {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price}</p>}
          </div>
          <div>
            <label className="label">Stock *</label>
            <input
              type="number"
              className="input"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
            />
            {errors.stock && <p className="text-xs text-red-600 mt-1">{errors.stock}</p>}
          </div>
        </div>

        <div>
          <label className="label">Category</label>
          <select
            className="input"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Image URL *</label>
          <input
            className="input"
            placeholder="/img/dept/drinks.jpg"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
          />
          {errors.image && <p className="text-xs text-red-600 mt-1">{errors.image}</p>}
          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="mt-2 w-24 h-24 object-cover rounded-lg border"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            rows={3}
            className="input"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="w-4 h-4 accent-primary"
          />
          Feature on homepage
        </label>

        <div className="flex justify-end gap-3 pt-2 border-t">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="cta" disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}