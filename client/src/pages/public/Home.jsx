import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useOutletContext } from "react-router-dom";
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
import FilterPanel from "../../components/public/FilterPanel";

// NOTE: category is NOT stored here — it lives in the URL.
const DEFAULT_FILTERS = {
  featuredOnly: false,
  inStockOnly: false,
  minPrice: "",
  maxPrice: "",
  columns: 4,
  sort: "default",
};

const PAGE_SIZE = 24;

export default function Home() {
  const dispatch = useDispatch();

  const products = useSelector(selectFilteredProducts);
  const { status, error } = useSelector((state) => state.products);
  const { filtersOpen, setFiltersOpen, handleFilterClick } = useOutletContext() || {};

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // ---- URL is the single source of truth for category ----
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

  // ---- Everything else lives in local state ----
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const loadMoreRef = useRef(null);

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Build category options from available products.
  const categories = useMemo(() => {
    return [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
          .map((c) => c.toLowerCase())
      ),
    ].sort();
  }, [products]);

  // Apply homepage filters and sorting.
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

    switch (filters.sort) {
      case "price-low":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price-high":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "name":
        result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }

    return result;
  }, [products, filters, searchQuery, category]);

  // Reset progressive display when filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, products, searchQuery, category]);

  // Reveal more of the already-fetched products near the bottom.
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

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    next.delete("category");
    setSearchParams(next, { replace: true });
  };

  const activeFilterCount = [
    filters.featuredOnly,
    category !== "all",
    filters.inStockOnly,
    filters.minPrice !== "",
    filters.maxPrice !== "",
    filters.sort !== "default",
  ].filter(Boolean).length;

  const hasActiveChips =
    activeFilterCount > 0 || filters.columns !== 4 || Boolean(searchQuery);

  return (
    <div className="container-page py-4 md:py-8">
      <Link to="/admin" className="flex w-full min-h-34 rounded-2xl bg-gray-200 mb-4">
        <div className="w-full flex flex-col items-center justify-center text-center px-6">
          <span className="text-sm md:text-2xl font-semibold font-serif mb-2">
            Everything you need in one place.
          </span>
          <p className="max-w-xl mx-auto text-xs leading-relaxed text-gray-500">
            {/* Find sustainable, everyday-essentials without the hassle of hours on research.  */}
            Find your everyday essentials and shop all your favourite
            products in one place.
            <span className="hidden md:inline-flex">
              We put the best front and center. So you'd get the best items you're looking for.
            </span>
          </p>
        </div>
        {/* <p className="text-[10px] text-gray-400 mt-5 text-center">
          © {new Date().getFullYear()} Olison Super Stores
        </p> */}
      </Link>

      {/* PRODUCT COUNT + ACTIVE FILTERS */}
      <section className="mb-4 flex flex-wrap gap-2 items-center justify-between">
        <p className="text-xs text-muted">
          Showing {visibleProducts.length} of {filteredProducts.length} products
        </p>

        <button
          type="button"
          title="Filter"
          onClick={handleFilterClick}
          aria-label="Open product filters"
          className="flex items-center justify-center gap-1 p-2 py-1 rounded-full text-text text-xs transition hover:bg-gray-200"
        >
          <SlidersHorizontal size={16} strokeWidth={1.5} />
          Filters
        </button>

        {hasActiveChips && (
          <div className="mt-0 flex flex-wrap items-center gap-2">
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

      {/* FILTER DRAWER */}
      <FilterPanel
        open={Boolean(filtersOpen)}
        onClose={() => setFiltersOpen?.(false)}
        filters={{ ...filters, category }}
        setFilters={setFilters}
        setCategory={setCategory}
        categories={categories}
        onReset={resetFilters}
      />

      <ProductQuickView product={selectedProduct} onClose={closeQuickView} />
    </div>
  );
}