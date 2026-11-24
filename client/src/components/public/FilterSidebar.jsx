import { useState } from "react";
import { X, RotateCcw, ChevronDown, Check } from "lucide-react";

import SortMenu from "./SortMenu"; // <-- Import SortMenu

export default function FilterSidebar({
  open,
  onClose,
  filters,
  setFilters,
  category = "all",
  setCategory,
  categories,
  onReset,
  categoryCounts = {},
  totalCount,
  priceBounds = { min: 0, max: 500000 },
  setPriceRange,
}) {
  const update = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-border rounded-r-3xl overflow-hidden
          flex flex-col transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          lg:sticky lg:top-14 lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:rounded-none
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Header */}
        <div className="h-16 px-6 flex lg:hidden items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-serif font-semibold">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Filters Area */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto px-5.5 py-4 space-y-1 scrollbar-hide"
        >
          {/* Category Section */}
          <CollapsibleSection title="Category" defaultOpen={true}>
            <div className="space-y-0.5 mt-2">
              <CategoryCheckbox
                label="All Products"
                checked={category === "all"}
                onChange={() => setCategory("all")}
                count={
                  typeof totalCount === "number"
                    ? totalCount
                    : Object.values(categoryCounts).reduce((a, b) => a + b, 0)
                }
              />

              {categories.map((cat) => {
                const isActive = category === cat;
                const count = categoryCounts[cat] ?? 0;
                return (
                  <CategoryCheckbox
                    key={cat}
                    label={cat.replaceAll("_", " ")}
                    checked={isActive}
                    onChange={() => setCategory(isActive ? "all" : cat)}
                    count={count}
                  />
                );
              })}
            </div>
          </CollapsibleSection>

          {/* Price Range Section */}
          <CollapsibleSection title="Price Range (₦)" defaultOpen={false}>
            <PriceRangeSlider
              min={filters.minPrice}
              max={filters.maxPrice}
              bounds={priceBounds}
              onChange={setPriceRange}
            />
          </CollapsibleSection>

          {/* Availability Section */}
          <CollapsibleSection title="Availability" defaultOpen={false}>
            <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer mt-2 group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => update("inStockOnly", e.target.checked)}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-200 transition-all checked:border-black checked:bg-black"
                />
                <Check
                  size={14}
                  className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                />
              </div>
              <span className="group-hover:text-black transition-colors">
                In Stock Only
              </span>
            </label>
          </CollapsibleSection>


          {/* Sort Section */}
          <CollapsibleSection title="Sort By" defaultOpen={true}>
            <SortMenu
              sortBy={filters.sort}
              sortDir={filters.sortDir}
              onChange={(sort, sortDir) => {
                setFilters((f) => ({ ...f, sort, sortDir }));
              }}
            />
          </CollapsibleSection>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-border bg-white mt-auto">
          <div className="flex gap-2.5">
            <button
              onClick={onReset}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-xs font-medium hover:bg-gray-50 transition-colors"
            >
              <RotateCcw size={14} /> Clear
            </button>
            <button
              onClick={onClose}
              className="flex flex-1 items-center justify-center rounded-full bg-black py-2.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Show results
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

/* --- Helper Components --- */

function CategoryCheckbox({ label, checked, onChange, count }) {
  return (
    <button
      onClick={onChange}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
        checked
          ? "bg-gray-50 text-black font-medium"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
          checked
            ? "border-black bg-black"
            : "border-gray-300 bg-white group-hover:border-gray-400"
        }`}
      >
        {checked && <Check size={13} strokeWidth={3} className="text-white" />}
      </span>
      <span className="capitalize text-left flex-1">{label}</span>
      {typeof count === "number" && (
        <span
          className={`text-xs tabular-nums ${
            checked ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function CollapsibleSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 py-3 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-1 text-left group"
      >
        <h3 className="text-xs text-muted font-sans font-semibold tracking-wide uppercase">
          {title}
        </h3>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function PriceRangeSlider({ min, max, bounds, onChange }) {
  const ABS_MIN = bounds?.min ?? 0;
  const ABS_MAX = bounds?.max ?? 500000;
  const span = ABS_MAX - ABS_MIN || 1;

  const numMin = min === "" || isNaN(Number(min)) ? ABS_MIN : Number(min);
  const numMax = max === "" || isNaN(Number(max)) ? ABS_MAX : Number(max);

  const step = Math.max(1, Math.round(span / 500));
  const safeMin = Math.min(numMin, numMax);
  const safeMax = Math.max(numMin, numMax);

  const minPct = ((safeMin - ABS_MIN) / span) * 100;
  const maxPct = ((safeMax - ABS_MIN) / span) * 100;

  const handleMin = (e) => {
    const value = Math.min(Number(e.target.value), safeMax - step);
    onChange(value, safeMax);
  };

  const handleMax = (e) => {
    const value = Math.max(Number(e.target.value), safeMin + step);
    onChange(safeMin, value);
  };

  return (
    <div className="mt-3 space-y-4">
      {/* Dual-range slider */}
      <div className="relative h-6">
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-gray-200" />
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-black"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />

        <input
          type="range"
          min={ABS_MIN}
          max={ABS_MAX}
          step={step}
          value={safeMin}
          onChange={handleMin}
          aria-label="Minimum price"
          className="range-thumb pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent"
        />

        <input
          type="range"
          min={ABS_MIN}
          max={ABS_MAX}
          step={step}
          value={safeMax}
          onChange={handleMax}
          aria-label="Maximum price"
          className="range-thumb pointer-events-none absolute inset-0 h-6 w-full appearance-none bg-transparent"
        />
      </div>

      {/* Manual number inputs */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] text-gray-500 font-medium">
            Min
          </label>
          <input
            type="number"
            placeholder="0"
            value={min}
            onChange={(e) => onChange(e.target.value, max)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
        </div>
        <span className="text-gray-400 mt-5">-</span>
        <div className="flex-1">
          <label className="mb-1 block text-end text-[11px] text-gray-500 font-medium">
            Max
          </label>
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => onChange(min, e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black transition-all"
          />
        </div>
      </div>
    </div>
  );
}