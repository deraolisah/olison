import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);

  const product = useSelector((s) =>
    s.products.items.find(
      (p) => String(p.id || p._id) === String(id)
    )
  );

  if (!product) {
    return (
      <section className="py-24 text-center">
        <h2>Product not found</h2>
        <Link to="/" className="cta mt-6 inline-flex">Back to Shop</Link>
      </section>
    );
  }

  const images = Array.isArray(product.productImages)
    ? product.productImages.filter(Boolean)
    : [];
  const cover = images[activeImage] || images[0] || "/img/placeholder.png";

  const onAdd = () => {
    // pass the whole product; cartSlice now extracts productImages[0]
    dispatch(addToCart({ ...product, quantity: 1 }));
    navigate("/cart");
  };

  return (
    <section className="py-20">
      <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-12 max-w-275">
        {/* Gallery */}
        <div className="space-y-3">
          <img
            src={cover}
            alt={product.name}
            className="h-105 w-full rounded-xl bg-gray-100 object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/img/placeholder.png";
            }}
          />

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activeImage
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-sm uppercase tracking-wider text-primary font-semibold">
            {product.category ?? "Product"}
          </p>
          <h1 className="text-4xl mt-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mt-4">
            ₦{Number(product.price).toLocaleString()}
          </p>

          <p className="mt-6 text-text/80">{product.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="cta" onClick={onAdd}>Add to Cart</button>
            <Link to="/" className="btn-ghost">← Back to Shop</Link>
          </div>
        </div>
      </div>
    </section>
  );
}