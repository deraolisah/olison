import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Heart,
  ArrowUp,
  RefreshCw,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  fetchProducts,
  selectFilteredProducts,
} from "../../redux/slices/productsSlice";

import ProductQuickView from "../../components/public/ProductQuickView";
import ProductMasonry from "../../components/public/ProductMasonry";
import FilterSidebar from "../../components/public/FilterSidebar";

// NOTE: category is NOT stored here — it lives in the URL.
const DEFAULT_FILTERS = {
  featuredOnly: false,
  inStockOnly: false,
  minPrice: "",
  maxPrice: "",
  columns: 4,
  sort: "recommended", // matched to SortMenu default
  sortDir: "asc",      // added for SortMenu
};

const PAGE_SIZE = 24;

export default function Home() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Layout states
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleFilterClick = () => setFilterOpen((prev) => !prev);

  // Redux
  const products = useSelector(selectFilteredProducts);
  const { status, error } = useSelector((state) => state.products);

  // ---- Raw (unfiltered) list for counts + slider bounds ----
  const allProducts = useSelector(
    (state) =>
      state.products.items ??
      state.products.all ??
      state.products.products ??
      state.products.list ??
      products
  );

  // Local UI state
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // URL is the single source of truth for search + category
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";

  const setCategory = useCallback(
    (value) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!value || value === "all") next.delete("category");
          else next.set("category", value);
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // Everything else lives in local state
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const loadMoreRef = useRef(null);

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Build category options from the raw list
  const categories = useMemo(() => {
    return [
      ...new Set(
        allProducts
          .map((product) => product.category)
          .filter(Boolean)
          .map((c) => c.toLowerCase())
      ),
    ].sort();
  }, [allProducts]);

  // Counts from the raw list (not the filtered list)
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const p of allProducts) {
      if (!p.category) continue;
      const key = p.category.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  const totalCount = allProducts.length;

  // Price slider bounds derived from the real data
  const priceBounds = useMemo(() => {
    const prices = allProducts
      .map((p) => Number(p.price))
      .filter((n) => Number.isFinite(n) && n > 0);
    if (!prices.length) return { min: 0, max: 500000 };
    return { min: 0, max: Math.ceil(Math.max(...prices) / 1000) * 1000 };
  }, [allProducts]);

  // Batched setter for the price pair — avoids the double-update race
  const setPriceRange = useCallback((nextMin, nextMax) => {
    setFilters((f) => ({ ...f, minPrice: nextMin, maxPrice: nextMax }));
  }, []);

  // Apply homepage filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (filters.featuredOnly) {
      result = result.filter((product) => product.featured);
    }

    if (category !== "all") {
      result = result.filter(
        (product) => product.category?.toLowerCase() === category
      );
    }

    if (filters.inStockOnly) {
      result = result.filter((product) => Number(product.stock) > 0);
    }

    if (filters.minPrice !== "") {
      result = result.filter(
        (product) => Number(product.price) >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      result = result.filter(
        (product) => Number(product.price) <= Number(filters.maxPrice)
      );
    }

    // --- UPDATED SORT LOGIC ---
    // Handles both the `sort` and `sortDir` from SortMenu
    const dir = filters.sortDir === "asc" ? 1 : -1;
    
    switch (filters.sort) {
      case "price":
        result.sort((a, b) => (Number(a.price) - Number(b.price)) * dir);
        break;
      case "name":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || "") * dir);
        break;
      case "date":
        result.sort(
          (a, b) => (new Date(b.createdAt || 0) - new Date(a.createdAt || 0)) * dir
        );
        break;
      case "stock":
        result.sort((a, b) => (Number(a.stock || 0) - Number(b.stock || 0)) * dir);
        break;
      case "recommended":
      default:
        // Default order (no sorting)
        break;
    }

    return result;
  }, [products, filters, searchQuery, category]);

  // Reset progressive display when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, products, searchQuery, category]);

  // Reveal more products near the bottom
  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= filteredProducts.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, filteredProducts.length)
          );
        }
      },
      { rootMargin: "500px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Single full reset used by the sidebar and every "clear" button
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    next.delete("category");
    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  const activeFilterCount = [
    filters.featuredOnly,
    category !== "all",
    filters.inStockOnly,
    filters.minPrice !== "",
    filters.maxPrice !== "",
    filters.sort !== "recommended",
  ].filter(Boolean).length;

  const hasActiveChips =
    activeFilterCount > 0 || filters.columns !== 4 || Boolean(searchQuery);

  return (
    <div className="flex min-h-screen w-full container-page px-0 bg-bg-alt text-text">
      {/* Left Sidebar for Filters */}
      <FilterSidebar
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
        category={category}
        setCategory={setCategory}
        categories={categories}
        onReset={resetFilters}
        categoryCounts={categoryCounts}
        totalCount={totalCount}
        priceBounds={priceBounds}
        setPriceRange={setPriceRange}
      />

      <div className="flex-1 min-w-0 px-4 pb-28 md:pb-6 py-4">
        {/* PRODUCT COUNT + ACTIVE FILTERS */}
        <section className="mb-4 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              title="Filter"
              onClick={handleFilterClick}
              aria-label="Open product filters"
              className="lg:hidden flex items-center justify-center gap-1 p-3 py-1.75 rounded-full text-text text-xs transition hover:bg-gray-200 border border-gray-300"
            >
              <SlidersHorizontal size={14} strokeWidth={1.5} />
              Filters
            </button>

            {hasActiveChips && (
              <div className="flex flex-wrap items-center gap-2">
                {filters.featuredOnly && (
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, featuredOnly: false }))
                    }
                    className="filter-chip"
                  >
                    Featured <X size={12} />
                  </button>
                )}

                {category !== "all" && (
                  <button
                    onClick={() => setCategory("all")}
                    className="filter-chip capitalize"
                  >
                    {category.replaceAll("_", " ")} <X size={12} />
                  </button>
                )}

                {filters.inStockOnly && (
                  <button
                    onClick={() =>
                      setFilters((f) => ({ ...f, inStockOnly: false }))
                    }
                    className="filter-chip"
                  >
                    In stock <X size={12} />
                  </button>
                )}

                {filters.minPrice !== "" && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, minPrice: "" }))}
                    className="filter-chip"
                  >
                    Min ₦{filters.minPrice} <X size={12} />
                  </button>
                )}

                {filters.maxPrice !== "" && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, maxPrice: "" }))}
                    className="filter-chip"
                  >
                    Max ₦{filters.maxPrice} <X size={12} />
                  </button>
                )}

                {filters.columns !== 4 && (
                  <button
                    onClick={() => setFilters((f) => ({ ...f, columns: 4 }))}
                    className="filter-chip"
                  >
                    {filters.columns} columns <X size={12} />
                  </button>
                )}

                {searchQuery && (
                  <button
                    onClick={() => {
                      const next = new URLSearchParams(searchParams);
                      next.delete("search");
                      setSearchParams(next);
                    }}
                    className="filter-chip"
                  >
                    "{searchQuery}" <X size={12} />
                  </button>
                )}

                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          

          <p className="text-xs text-muted text-end whitespace-nowrap">
            Showing {visibleProducts.length} of {filteredProducts.length} products
          </p>
        </section>

        {/* LOADING */}
        {(status === "idle" || status === "loading") && (
          <div className="product-masonry">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="product-masonry-item overflow-hidden rounded-xl border border-border"
              >
                <div
                  className={`animate-pulse bg-gray-100 ${
                    index % 3 === 0 ? "aspect-4/5" : "aspect-square"
                  }`}
                />
                <div className="space-y-3 p-3">
                  <div className="h-3 w-1/3 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {status === "failed" && (
          <div className="rounded-2xl bg-bg-alt py-16 text-center">
            <h3 className="text-lg font-semibold">Unable to load products</h3>
            <p className="mt-2 text-sm text-muted">
              {error || "Something went wrong. Please try again."}
            </p>
            <button
              onClick={() => dispatch(fetchProducts())}
              className="cta mt-5"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </div>
        )}

        {/* PRODUCT FEED */}
        {status === "succeeded" && filteredProducts.length > 0 && (
          <>
            <ProductMasonry
              products={visibleProducts}
              columns={filters.columns}
              onQuickView={handleQuickView}
            />

            <div
              ref={loadMoreRef}
              className="py-10 text-center text-xs text-muted"
            >
              {visibleCount < filteredProducts.length
                ? "Loading more products..."
                : "You've reached the end of the collection."}
            </div>

            <button
              onClick={() => scrollTo(0, 0)}
              className="text-sm text-center mx-auto flex items-center justify-center gap-1 hover:text-muted"
            >
              Back to top
              <ArrowUp size={14} strokeWidth={1.5} />
            </button>
          </>
        )}

        {/* EMPTY */}
        {status === "succeeded" && filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-bg-alt py-20 text-center">
            <ShoppingBag size={30} className="mx-auto text-muted" />
            <h3 className="mt-5 text-lg font-semibold">No matching products</h3>
            <p className="mt-2 text-sm text-muted">
              Try changing your filters to discover more products.
            </p>
            <button onClick={resetFilters} className="cta mt-5">
              Clear filters
            </button>
          </div>
        )}

        <ProductQuickView product={selectedProduct} onClose={closeQuickView} />
      </div>
    </div>
  );
}