import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  fetchProducts,
  selectFilteredProducts,
  setCategoryFilter,
} from "../../redux/slices/productsSlice";

export default function Shop() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);
  const status = useSelector((s) => s.products.status);

  // Load once
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Sync URL → filter
  useEffect(() => {
    dispatch(setCategoryFilter(category || "all"));
  }, [category, dispatch]);

  return (
    <section className="py-20">
      <div className="container-page">
        <h2 className="text-center capitalize">
          {category ? category : "All Products"}
        </h2>

        {status === "loading" && (
          <p className="text-center text-text/50 mt-10">Loading…</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {products.map((p) => (
            <article key={p.id} className="card flex flex-col">
              <Link to={`/product/${p.id}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-lg bg-gray-100"
                  loading="lazy"
                  onError={(e) => (e.target.src = "/img/placeholder.png")}
                />
              </Link>
              <h4 className="mt-3 font-semibold line-clamp-1">{p.name}</h4>
              <p className="text-primary font-bold mt-1">
                ₦{Number(p.price).toLocaleString()}
              </p>
              <button
                className="cta mt-auto pt-2"
                onClick={() => dispatch(addToCart(p))}
              >
                Add to Cart
              </button>
            </article>
          ))}
        </div>

        {status === "succeeded" && products.length === 0 && (
          <p className="text-center text-text/50 mt-10">
            No products in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}