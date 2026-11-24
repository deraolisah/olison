import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Search, X, Loader2 } from "lucide-react";
import { selectFilteredProducts } from "../../redux/slices/productsSlice";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  
  // Pull products from Redux
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((state) => state.products.status);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Live search logic
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [products, query]);

  // Display only the first 6 results in the modal
  const displayedResults = results.slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleSeeAll = () => {
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center">
      {/* Click outside to close */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-h-[90vh] rounded-b-3xl bg-white shadow-2xl flex flex-col animate-in slide-in-from-top-4 fade-in duration-200">
        {/* Search Bar */}
        <div className="w-full border-b border-gray-200">
          <form
            onSubmit={handleSearch}
            className="container-page flex items-center py-2"
          >
            <Search size={22} className="text-gray-500 shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent px-4 py-4 text-base md:text-xl font-serif outline-none placeholder:text-gray-300 placeholder:font-sans"
            />
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors"
              aria-label="Close search"
            >
              <X size={24} />
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto container-page py-6" data-lenis-prevent>
          {/* Loading State */}
          {(status === "idle" || status === "loading") && query && (
            <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading products...</span>
            </div>
          )}

          {/* Results Header */}
          {status === "succeeded" && query && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                {results.length} Result{results.length !== 1 && "s"}
              </p>
            </div>
          )}

          {/* Grid of Results */}
          {status === "succeeded" && query && displayedResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
              {displayedResults.map((product) => (
                <div
                  key={product._id || product.id}
                  onClick={() => {
                    // Depending on your routing, you might want to go to the product page
                    // or open a QuickView. Here we'll just go to the search page.
                    handleSeeAll();
                  }}
                  className="group flex gap-4 cursor-pointer items-start"
                >
                  {/* Thumbnail */}
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={
                        product.images?.[0] ||
                        product.image ||
                        "/placeholder.png"
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col py-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 capitalize">
                      {product.category?.replaceAll("_", " ")} ·{" "}
                      <span className="text-gray-900">
                        ₦{Number(product.price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {status === "succeeded" && query && results.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-500">
                No results found for "<span className="font-medium text-black">{query}</span>"
              </p>
              <p className="mt-2 text-sm text-gray-400">
                Try checking your spelling or using more general terms.
              </p>
            </div>
          )}

          {/* Default State (No query) */}
          {!query && (
            <div className="py-20 text-center">
              <Search size={40} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400">
                Start typing to search for products...
              </p>
            </div>
          )}
        </div>

        {/* Footer / See All */}
        {status === "succeeded" && results.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50 p-4">
            <div className="container-page">
              <button
                onClick={handleSeeAll}
                className="group flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
              >
                See all {results.length} results
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}