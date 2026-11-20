import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
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
  productImages: [""],
  description: "",
  featured: false,
  imageRatio: "square",
};

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const dispatch = useDispatch();
  const isEdit = Boolean(product);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      const images = Array.isArray(product.productImages)
        ? product.productImages
        : product.productImage
          ? [product.productImage]
          : [""];
      setForm({
        name: product.name ?? "",
        price: product.price ?? "",
        stock: product.stock ?? "",
        category: product.category ?? "groceries",
        productImages: images.length ? images : [""],
        description: product.description ?? "",
        featured: Boolean(product.featured),
        imageRatio: product.imageRatio ?? "square",
      });
    } else {
      setForm(emptyForm);
    }
  }, [product]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const setImage = (index, value) =>
    setForm((f) => {
      const next = [...f.productImages];
      next[index] = value;
      return { ...f, productImages: next };
    });

  const addImage = () =>
    setForm((f) => ({ ...f, productImages: [...f.productImages, ""] }));

  const removeImage = (index) =>
    setForm((f) => {
      const next = f.productImages.filter((_, i) => i !== index);
      return { ...f, productImages: next.length ? next : [""] };
    });

  const moveImage = (index, dir) =>
    setForm((f) => {
      const next = [...f.productImages];
      const target = index + dir;
      if (target < 0 || target >= next.length) return f;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...f, productImages: next };
    });

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || Number(form.price) <= 0) e.price = "Price must be > 0";
    if (form.stock === "" || Number(form.stock) < 0)
      e.stock = "Stock can't be negative";

    const cleaned = form.productImages.map((s) => s.trim()).filter(Boolean);
    if (cleaned.length === 0) e.productImages = "At least one image URL required";

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
      productImages: form.productImages.map((s) => s.trim()).filter(Boolean),
    };

    let res;
    if (isEdit) {
      res = await dispatch(
        updateProduct({ id: product.id || product._id, data: payload })
      );
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
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
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
            {errors.price && (
              <p className="text-xs text-red-600 mt-1">{errors.price}</p>
            )}
          </div>
          <div>
            <label className="label">Stock *</label>
            <input
              type="number"
              className="input"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
            />
            {errors.stock && (
              <p className="text-xs text-red-600 mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            <label className="label">Image Ratio</label>
            <select
              className="input"
              value={form.imageRatio}
              onChange={(e) => set("imageRatio", e.target.value)}
            >
              <option value="square">Square (1:1)</option>
              <option value="portrait">Portrait (4:5)</option>
              <option value="landscape">Landscape (5:4)</option>
            </select>
          </div>
        </div>

        {/* Multi-image manager */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label mb-0">Product Images *</label>
            <button
              type="button"
              onClick={addImage}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <Plus size={13} /> Add image
            </button>
          </div>

          <div className="space-y-2">
            {form.productImages.map((url, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-6 text-center text-xs text-gray-400">
                  {i + 1}
                </span>

                {url.trim() && (
                  <img
                    src={url}
                    alt=""
                    className="h-10 w-10 rounded object-cover bg-gray-100 border"
                    onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                  />
                )}

                <input
                  className="input flex-1"
                  placeholder="/img/dept/drinks.jpg"
                  value={url}
                  onChange={(e) => setImage(i, e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  disabled={i === 0}
                  className="p-1.5 text-gray-400 hover:text-text disabled:opacity-30"
                  aria-label="Move up"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  disabled={i === form.productImages.length - 1}
                  className="p-1.5 text-gray-400 hover:text-text disabled:opacity-30"
                  aria-label="Move down"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 text-gray-400 hover:text-red-600"
                  aria-label="Remove image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {errors.productImages && (
            <p className="text-xs text-red-600 mt-1">{errors.productImages}</p>
          )}
          <p className="text-[11px] text-gray-400 mt-1">
            First image is the cover shown in grids. Swipe order = row order.
          </p>
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