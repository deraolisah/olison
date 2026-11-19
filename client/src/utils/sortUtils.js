// src/utils/sortUtils.js

export const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended", group: "default" },
  { value: "name",         label: "Name",        group: "alpha" },
  { value: "price",        label: "Price",       group: "numeric" },
  { value: "date",         label: "Date added",  group: "date" },
  { value: "stock",        label: "Stock",       group: "numeric" },
];

export const SORT_DIRECTIONS = {
  name:  { asc: "A → Z", desc: "Z → A" },
  price: { asc: "Low → High", desc: "High → Low" },
  date:  { asc: "Oldest first", desc: "Newest first" },
  stock: { asc: "Low → High", desc: "High → Low" },
};

export function applySort(products, sortBy = "recommended", sortDir = "asc") {
  if (sortBy === "recommended") return products;

  const dir = sortDir === "desc" ? -1 : 1;
  const copy = [...products];

  copy.sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.name || "").localeCompare(b.name || "") * dir;

      case "price":
        return (Number(a.price) - Number(b.price)) * dir;

      case "stock":
        return (Number(a.stock) - Number(b.stock)) * dir;

      case "date": {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return (da - db) * dir;
      }

      default:
        return 0;
    }
  });

  return copy;
}