
import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";
import {
  RefreshCw,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

import {
  fetchProducts,
  selectFilteredProducts,
} from "../../redux/slices/productsSlice";

import ProductMasonry from "../../components/public/ProductMasonry";
import FilterPanel from "../../components/public/FilterPanel";

const DEFAULT_FILTERS = {
  featuredOnly: false,
  category: "all",
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

  const { filtersOpen, setFiltersOpen } = useOutletContext() || {};

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const loadMoreRef = useRef(null);

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
          .map((category) => category.toLowerCase())
      ),
    ].sort();
  }, [products]);

  // Apply homepage filters and sorting.
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.featuredOnly) {
      result = result.filter((product) => product.featured);
    }

    if (filters.category !== "all") {
      result = result.filter(
        (product) =>
          product.category?.toLowerCase() === filters.category
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
        result.sort((a, b) =>
          (a.name || "").localeCompare(b.name || "")
        );
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
  }, [products, filters]);

  // Reset progressive display when filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters, products]);

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
  };

  const activeFilterCount = [
    filters.featuredOnly,
    filters.category !== "all",
    filters.inStockOnly,
    filters.minPrice !== "",
    filters.maxPrice !== "",
    filters.sort !== "default",
  ].filter(Boolean).length;

  return (
    <div className="container-page py-4 md:py-8">
      <section className="w-full h-32 rounded-2xl bg-gray-200 mb-4">

      </section>
      <section className="flex items-center justify-between gap-2">
        {/* ACTIVE FILTERS */}
        {(activeFilterCount > 0 || filters.columns !== 4) && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
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

            {filters.category !== "all" && (
              <button
                onClick={() =>
                  setFilters((f) => ({ ...f, category: "all" }))
                }
                className="filter-chip capitalize"
              >
                {filters.category.replaceAll("_", " ")} <X size={12} />
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
                onClick={() =>
                  setFilters((f) => ({ ...f, columns: 4 }))
                }
                className="filter-chip"
              >
                {filters.columns} columns <X size={12} />
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


        <button
          type="button"
          onClick={() => setFiltersOpen?.(true)}
          className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium transition hover:border-primary hover:text-primary"
        >
          <SlidersHorizontal size={16} />

          Filters

          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </section>

      {/* PRODUCT COUNT */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-muted">
          Showing {visibleProducts.length} of {filteredProducts.length} products
        </p>

        <span className="text-xs text-muted">
          {filters.columns} columns
        </span>
      </div>

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
          <h3 className="text-lg font-semibold">
            Unable to load products
          </h3>

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
          />

          <div
            ref={loadMoreRef}
            className="py-10 text-center text-xs text-muted"
          >
            {visibleCount < filteredProducts.length
              ? "Loading more products..."
              : "You've reached the end of the collection."}
          </div>
        </>
      )}

      {/* EMPTY */}
      {status === "succeeded" && filteredProducts.length === 0 && (
        <div className="rounded-2xl bg-bg-alt py-20 text-center">
          <ShoppingBag size={30} className="mx-auto text-muted" />

          <h3 className="mt-5 text-lg font-semibold">
            No matching products
          </h3>

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
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        onReset={resetFilters}
      />
    </div>
  );
}