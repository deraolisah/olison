
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  ArrowUpRight,
  Package,
  Check,
} from "lucide-react";
import { addToCart } from "../../redux/slices/cartSlice";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function ProductQuickView({
  product,
  onClose,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // inside component
  const [activeImage, setActiveImage] = useState(0);
  const images = Array.isArray(product?.productImages)
    ? product.productImages.filter(Boolean)
    : [];
  const currentImage = images[activeImage];



  const productId = product?.id || product?._id;
  const image = product?.productImage || product?.image;
  const stock = Number(product?.stock) || 0;
  const inStock = stock > 0;

  useEffect(() => {
    setQuantity(1);
    setAdded(false);
    setImageError(false);
  }, [productId]);

  // reset when product changes
  useEffect(() => {
    setActiveImage(0);
  }, [productId]);

  // Close with Escape and prevent background scrolling.
  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (!inStock) return;

    // Uses your existing addToCart(product) Redux action.
    // Dispatch once per selected item because your existing
    // ProductDetail currently adds one product per dispatch.
    for (let i = 0; i < quantity; i += 1) {
      dispatch(addToCart(product));
    }

    setAdded(true);
  };

  return (
    <div
      className="fixed inset-0 z-120 flex items-end justify-center bg-black/40 sm:items-center sm:p-5 cursor-pointer"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative flex max-h-[90dvh] md:max-h-[80dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:flex-row cursor-auto"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product preview"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text shadow-md transition hover:bg-gray-100"
        >
          <X size={19} />
        </button>

        {/* Product image */}
        <div className="relative max-h-65 sm:max-h-full md:w-1/2 overflow-hidden! p-1">
          {currentImage && !imageError ? (
            <img
              src={currentImage}
              alt={product.name || "Product"}
              onError={() => setImageError(true)}
              className="w-full h-full  min-h-full w-full object-contain md:object-cover md:absolute rounded-t-3xl md:rounded-l-3xl md:rounded-none"
            />
          ) : (
            <div className="flex h-full min-h-65 items-center justify-center bg-gray-200 text-muted rounded-t-3xl md:rounded-l-3xl md:rounded-none">
              <Package size={60} strokeWidth={1} />
            </div>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[90%] -translate-x-1/2 gap-2 overflow-x-auto rounded-xl bg-white/60 p-1.25 backdrop-blur-md">
              {images.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Show image ${i + 1}`}
                  className={`h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                    i === activeImage ? "border-primary" : "border-transparent opacity-70"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product information */}
        <div data-lenis-prevent className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8 md:w-1/2 md:justify-center">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[1.8px] text-primary">
            {(product.category || "General").replaceAll("_", " ")}
          </div>

          <h2
            id="quick-view-title"
            className="max-w-md text-2xl font-semibold leading-tight tracking-tight text-text sm:text-3xl"
          >
            {product.name || "Unnamed Product"}
          </h2>

          <p className="mt-4 text-2xl font-bold text-text">
            {formatPrice(product.price)}
          </p>

          <div className="my-5 h-px bg-border" />

          <p className="text-sm leading-7 text-muted">
            {product.description ||
              "A quality product from Olison Super Stores. Add it to your cart and enjoy convenient shopping."}
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs">
            {inStock ? (
              <>
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="font-medium text-success">
                  In stock
                </span>
                <span className="text-muted">
                  · {stock} available
                </span>
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="font-medium text-red-500">
                  Currently unavailable
                </span>
              </>
            )}
          </div>

          {/* Quantity selector */}
          {inStock && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text">
                Quantity
              </p>

              <div className="flex w-fit items-center gap-5 rounded-full border border-border px-3 py-2">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((current) => Math.max(1, current - 1))
                  }
                  aria-label="Decrease quantity"
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:opacity-30"
                >
                  <Minus size={15} />
                </button>

                <span className="min-w-5 text-center text-sm font-semibold tabular-nums">
                  {quantity}
                </span>

                <button
                  type="button"
                  disabled={quantity >= stock}
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(stock, current + 1)
                    )
                  }
                  aria-label="Increase quantity"
                  className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-gray-100 disabled:opacity-30"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 space-y-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!inStock}
              className="cta flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {added ? <Check size={18} /> : <ShoppingCart size={18} />}
              {added ? "Added to cart" : "Add to Cart"}
            </button>

            <Link
              to={`/product/${productId}`}
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-text transition hover:border-primary hover:text-primary"
            >
              View full product details
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {added && (
            <p className="mt-3 text-center text-xs font-medium text-success">
              {quantity} {quantity === 1 ? "item" : "items"} added to your cart.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
