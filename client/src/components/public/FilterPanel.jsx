
// import {
//   X,
//   SlidersHorizontal,
//   Check,
//   RotateCcw,
// } from "lucide-react";

// export default function FilterPanel({
//   open,
//   onClose,
//   filters,
//   setFilters,
//   categories,
//   onReset,
// }) {
// //   if (!open) return null;

//   const update = (key, value) => {
//     setFilters((current) => ({
//       ...current,
//       [key]: value,
//     }));
//   };

//   return (
//     <div className="fixed inset-0 z-30 md:z-100 pointer-events-none">
//       {open && (
//         <button
//           type="button"
//           aria-label="Close Filters"
//           onClick={onClose}
//           className="absolute z-30 inset-0 bg-black/40 pointer-events-auto"
//         />
//       )}

//       <aside className={`
//         fixed z-30 left-1/2 -translate-x-1/2 
//         w-full max-w-[90vw] max-h-[88dvh]
//         md:absolute md:left-auto md:right-0 md:top-0
//         flex flex-col
//         md:h-full md:max-h-full md:w-full md:max-w-md
//         bg-white md:shadow-2xl overflow-hidden
//         rounded-4xl rounded-t-3xl md:rounded-none
//         transition-transform pointer-events-auto
//         ${open
//             ? "translate-y-0 md:translate-x-0 bottom-4"
//             : "translate-y-full md:translate-x-full bottom-0"}
//         `}>
//         <div className="flex items-center justify-between border-b border-border px-5 min-h-14">
//           <h2 className="font-semibold text-lg"> Filter </h2>

//           <button
//             onClick={onClose}
//             aria-label="Close filters"
//             className="rounded-full p-2 hover:bg-gray-100"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Filter options */}
//         <div data-lenis-prevent className="flex-1 space-y-7 overflow-y-auto p-6">

//           {/* Featured */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Product selection</h3>

//             <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border p-4">
//               <div>
//                 <p className="font-medium text-sm">Featured products</p>
//                 <p className="mt-1 text-xs text-muted">
//                   Show handpicked products only
//                 </p>
//               </div>

//               <input
//                 type="checkbox"
//                 checked={filters.featuredOnly}
//                 onChange={(e) =>
//                   update("featuredOnly", e.target.checked)
//                 }
//                 className="h-5 w-5 accent-primary"
//               />
//             </label>
//           </section>

//           {/* Categories */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Categories</h3>

//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => update("category", "all")}
//                 className={`rounded-full px-4 py-2 text-xs font-medium transition ${
//                   filters.category === "all"
//                     ? "bg-primary text-white"
//                     : "bg-gray-100 text-text hover:bg-gray-200"
//                 }`}
//               >
//                 All products
//               </button>

//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => update("category", category)}
//                   className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition ${
//                     filters.category === category
//                       ? "bg-primary text-white"
//                       : "bg-gray-100 text-text hover:bg-gray-200"
//                   }`}
//                 >
//                   {category.replaceAll("_", " ")}
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* Availability */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Availability</h3>

//             <label className="flex cursor-pointer items-center gap-3 text-sm">
//               <input
//                 type="checkbox"
//                 checked={filters.inStockOnly}
//                 onChange={(e) =>
//                   update("inStockOnly", e.target.checked)
//                 }
//                 className="h-4 w-4 accent-primary"
//               />
//               In-stock products only
//             </label>
//           </section>

//           {/* Price */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Price range (₦)</h3>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label className="mb-2 block text-xs text-muted">
//                   Minimum price
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={filters.minPrice}
//                   onChange={(e) =>
//                     update("minPrice", e.target.value)
//                   }
//                   placeholder="0"
//                   className="input w-full"
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-xs text-muted">
//                   Maximum price
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={filters.maxPrice}
//                   onChange={(e) =>
//                     update("maxPrice", e.target.value)
//                   }
//                   placeholder="No limit"
//                   className="input w-full"
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Grid layout */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Grid layout</h3>

//             <div className="grid grid-cols-3 gap-3">
//               {[3, 4, 5].map((count) => (
//                 <button
//                   key={count}
//                   onClick={() => update("columns", count)}
//                   className={`rounded-xl border p-3 transition ${
//                     filters.columns === count
//                       ? "border-primary bg-primary/5 text-primary"
//                       : "border-border hover:border-gray-400"
//                   }`}
//                 >
//                   <div
//                     className="mx-auto mb-2 grid w-fit gap-1"
//                     style={{
//                       gridTemplateColumns: `repeat(${count}, 5px)`,
//                     }}
//                   >
//                     {Array.from({ length: count * 2 }).map((_, i) => (
//                       <span
//                         key={i}
//                         className={`h-2 w-[1.25rounded-[2px] ${
//                           filters.columns === count
//                             ? "bg-primary"
//                             : "bg-gray-400"
//                         }`}
//                       />
//                     ))}
//                   </div>

//                   <span className="text-xs font-semibold">
//                     {count} columns
//                   </span>

//                   {filters.columns === count && (
//                     <Check size={13} className="mx-auto mt-1" />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </section>

//           {/* Sorting */}
//           <section>
//             <h3 className="mb-3 font-semibold text-sm">Sort products</h3>

//             <select
//               value={filters.sort}
//               onChange={(e) => update("sort", e.target.value)}
//               className="input w-full"
//             >
//               <option value="default">Recommended</option>
//               <option value="newest">Newest first</option>
//               <option value="price-low">Price: Low to high</option>
//               <option value="price-high">Price: High to low</option>
//               <option value="name">Name: A to Z</option>
//             </select>
//           </section>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center gap-3 border-t border-border bg-white px-5 py-4 pb-18 md:pb-4">
//           <button
//             onClick={onReset}
//             className="btn-ghost flex flex-1 items-center justify-center gap-2"
//           >
//             <RotateCcw size={15} />
//             Reset
//           </button>

//           <button
//             onClick={onClose}
//             className="cta flex-1 justify-center py-2.5"
//           >
//             Apply filters
//           </button>
//         </div>
//       </aside>
//     </div>
//   );
// }









// src/components/public/FilterPanel.jsx
import { X, RotateCcw, Check, SlidersHorizontal, Star } from "lucide-react";
import SortMenu from "./SortMenu";

const CATEGORY_ICONS = {
  groceries: "🛒",
  drinks: "🥤",
  cosmetics: "💄",
  household: "🏠",
  snacks: "🍿",
  baby: "🍼",
  frozen: "❄️",
  toiletries: "🧴",
  fashion: "👗",
  bakery: "🥐",
  electronics: "🔌",
  furniture: "🛋️",
  gym: "🏋️",
};

export default function FilterPanel({
  open,
  onClose,
  filters,
  setFilters,
  categories,
  onReset,
}) {
  const update = (key, value) =>
    setFilters((current) => ({ ...current, [key]: value }));

  const activeCount = [
    filters.featuredOnly,
    filters.category !== "all",
    filters.inStockOnly,
    filters.minPrice !== "",
    filters.maxPrice !== "",
    filters.sort !== "recommended",
  ].filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-30 md:z-100 pointer-events-none">
      {/* Backdrop */}
      {open && (
        <button
          type="button"
          aria-label="Close Filters"
          onClick={onClose}
          className="pointer-events-auto absolute inset-0 bg-black/40
                     transition-all duration-300"
        />
      )}

      {/* Panel */}
      <aside
        className={`
          fixed bottom-0 left-1/2 z-100 -translate-x-1/2
          w-full max-w-[90dvw] max-h-[88dvh]
          md:left-auto md:right-0 md:top-0 md:bottom-0 md:translate-x-0
          md:max-h-none md:w-full md:max-w-sm
          flex flex-col overflow-hidden rounded-t-3xl rounded-4xl md:rounded-none
          bg-white shadow-2xl pointer-events-auto
          transition-all duration-300 ease-out
          ${open
            ? "translate-y-0 md:translate-x-0 opacity-100 bottom-4"
            : "translate-y-full md:translate-y-0 md:translate-x-[110%] opacity-100 bottom-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 min-h-14">
          <div className="flex items-center gap-2">
            {/* <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
              <SlidersHorizontal size={16} />
            </span> */}
            <div>
              <h2 className="text-base font-semibold leading-tight font-sans!">Filters</h2>
              <p className="text-[11px] text-muted">
                {activeCount === 0
                  ? "No filters applied"
                  : `${activeCount} active`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-full p-2 text-muted hover:bg-gray-100 hover:text-text"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div
          data-lenis-prevent
          className="flex-1 space-y-6 overflow-y-auto px-5 py-5"
        >
          {/* Featured */}
          <Section title="Product selection">
            <label
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-2xl border p-3.5 transition ${
                filters.featuredOnly
                  ? "border-primary/40 bg-primary/5"
                  : "border-border hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-600">
                  <Star size={16} fill="currentColor" />
                </span> */}
                <Toggle
                  checked={filters.featuredOnly}
                  onChange={(v) => update("featuredOnly", v)}
                />
                <div>
                  <p className="text-sm font-medium">Featured only</p>
                  {/* <p className="text-[11px] text-muted">
                    Handpicked products
                  </p> */}
                </div>
              </div>
              
            </label>
          </Section>

          {/* Availability */}
          <Section title="Availability">
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <Toggle
                checked={filters.inStockOnly}
                onChange={(v) => update("inStockOnly", v)}
              />
              In-stock products only
            </label>
          </Section>

          {/* Categories */}
          <Section title="Categories">
            <div className="flex flex-wrap gap-2">
              <Chip
                active={filters.category === "all"}
                onClick={() => update("category", "all")}
              >
                All products
              </Chip>

              {categories.map((cat) => (
                <Chip
                  key={cat}
                  active={filters.category === cat}
                  onClick={() => update("category", cat)}
                >
                  <span className="mr-1">
                    {CATEGORY_ICONS[cat] || "•"}
                  </span>
                  {cat.replaceAll("_", " ")}
                </Chip>
              ))}
            </div>
          </Section>

          {/* Price */}
          <Section title="Price range (₦)">
            <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
              <div>
                <label className="mb-1.5 block text-[11px] text-muted">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) => update("minPrice", e.target.value)}
                  placeholder="0"
                  className="input w-full"
                />
              </div>

              <span className="pb-2.5 text-xs text-muted">—</span>

              <div>
                <label className="mb-1.5 block text-[11px] text-muted">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) => update("maxPrice", e.target.value)}
                  placeholder="Any"
                  className="input w-full"
                />
              </div>
            </div>

            {/* Quick price presets */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {[
                { label: "Under ₦1k", min: 0, max: 1000 },
                { label: "₦1k–₦5k", min: 1000, max: 5000 },
                { label: "₦5k–₦10k", min: 5000, max: 10000 },
                { label: "₦10k+", min: 10000, max: "" },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() =>
                    setFilters((f) => ({
                      ...f,
                      minPrice: String(p.min),
                      maxPrice: String(p.max),
                    }))
                  }
                  className="rounded-full border border-border px-3 py-1 text-[11px] font-medium text-muted hover:border-primary/40 hover:text-primary"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </Section>

          {/* Layout */}
          <Section title="Grid layout">
            <div className="grid grid-cols-3 gap-2">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => update("columns", count)}
                  className={`
                    rounded-xl border p-3 transition
                    ${
                      filters.columns === count
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/30"
                        : "border-border text-muted hover:border-gray-400"
                    }
                  `}
                >
                  <div
                    className="mx-auto mb-2 grid w-fit gap-1"
                    style={{ gridTemplateColumns: `repeat(${count}, 6px)` }}
                  >
                    {Array.from({ length: count * 2 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2.5 w-1.5 rounded-sm ${
                          filters.columns === count ? "bg-primary" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold">{count} cols</span>
                </button>
              ))}
            </div>
          </Section>

          {/* Sort */}
          <Section title="Sort products">
            <div className="w-full flex">
              <SortMenu
                sortBy={filters.sort}
                sortDir={filters.sortDir}
                onChange={(sort, sortDir) =>
                  setFilters((f) => ({ ...f, sort, sortDir }))
                }
              />
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-border/60 bg-white px-5 py-4 pb-18 md:pb-4">
          <button
            onClick={onReset}
            className="btn-ghost flex flex-1 items-center justify-center gap-2"
          >
            <RotateCcw size={14} />
            Reset
          </button>
          <button
            onClick={onClose}
            className="cta flex-1 justify-center py-2.5"
          >
            <Check size={16} />
            Apply
          </button>
        </div>
      </aside>
    </div>
  );
}

/* ---------- small helpers ---------- */

function Section({ title, children }) {
  return (
    <section>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-full px-3.5 py-1.5 text-xs font-medium capitalize transition
        ${active
          ? "bg-primary text-white shadow-sm shadow-primary/30"
          : "bg-gray-100 text-text hover:bg-gray-200"}
      `}
    >
      {children}
    </button>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <span
      role="switch"
      aria-checked={checked}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`
        relative inline-flex h-6 w-10 cursor-pointer items-center rounded-full
        transition-colors ${checked ? "bg-primary" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4.5 w-4.5 rounded-full bg-white shadow
          transition-transform ${checked ? "translate-x-5" : "translate-x-1"}
        `}
      />
    </span>
  );
}