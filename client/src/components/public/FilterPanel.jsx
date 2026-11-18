
import {
  X,
  SlidersHorizontal,
  Check,
  RotateCcw,
} from "lucide-react";

export default function FilterPanel({
  open,
  onClose,
  filters,
  setFilters,
  categories,
  onReset,
}) {
  if (!open) return null;

  const update = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-100">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 "
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 h-14">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <SlidersHorizontal size={19} />
            </div>

            <div>
              <h2 className="font-semibold text-lg">Filters</h2>
              {/* <p className="text-xs text-muted">
                Customise your discovery feed
              </p> */}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close filters"
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter options */}
        <div data-lenis-prevent className="flex-1 space-y-7 overflow-y-auto p-6">

          {/* Featured */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Product selection</h3>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <p className="font-medium text-sm">Featured products</p>
                <p className="mt-1 text-xs text-muted">
                  Show handpicked products only
                </p>
              </div>

              <input
                type="checkbox"
                checked={filters.featuredOnly}
                onChange={(e) =>
                  update("featuredOnly", e.target.checked)
                }
                className="h-5 w-5 accent-primary"
              />
            </label>
          </section>

          {/* Categories */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Categories</h3>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => update("category", "all")}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  filters.category === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-text hover:bg-gray-200"
                }`}
              >
                All products
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => update("category", category)}
                  className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition ${
                    filters.category === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-text hover:bg-gray-200"
                  }`}
                >
                  {category.replaceAll("_", " ")}
                </button>
              ))}
            </div>
          </section>

          {/* Availability */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Availability</h3>

            <label className="flex cursor-pointer items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  update("inStockOnly", e.target.checked)
                }
                className="h-4 w-4 accent-primary"
              />
              In-stock products only
            </label>
          </section>

          {/* Price */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Price range (₦)</h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs text-muted">
                  Minimum price
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.minPrice}
                  onChange={(e) =>
                    update("minPrice", e.target.value)
                  }
                  placeholder="0"
                  className="input w-full"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs text-muted">
                  Maximum price
                </label>
                <input
                  type="number"
                  min="0"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    update("maxPrice", e.target.value)
                  }
                  placeholder="No limit"
                  className="input w-full"
                />
              </div>
            </div>
          </section>

          {/* Grid layout */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Grid layout</h3>

            <div className="grid grid-cols-3 gap-3">
              {[3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => update("columns", count)}
                  className={`rounded-xl border p-3 transition ${
                    filters.columns === count
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-gray-400"
                  }`}
                >
                  <div
                    className="mx-auto mb-2 grid w-fit gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${count}, 5px)`,
                    }}
                  >
                    {Array.from({ length: count * 2 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-[5px] rounded-[2px] ${
                          filters.columns === count
                            ? "bg-primary"
                            : "bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-semibold">
                    {count} columns
                  </span>

                  {filters.columns === count && (
                    <Check size={13} className="mx-auto mt-1" />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Sorting */}
          <section>
            <h3 className="mb-3 font-semibold text-sm">Sort products</h3>

            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className="input w-full"
            >
              <option value="default">Recommended</option>
              <option value="newest">Newest first</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 border-t border-border bg-white p-5">
          <button
            onClick={onReset}
            className="btn-ghost flex flex-1 items-center justify-center gap-2"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            onClick={onClose}
            className="cta flex-1 justify-center"
          >
            Apply filters
          </button>
        </div>
      </aside>
    </div>
  );
}
