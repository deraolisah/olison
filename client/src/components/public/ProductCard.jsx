
import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Package,
  Dot,
  CircleStar,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function ProductCard({ product, onQuickView }) {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const {
    name,
    price,
    category,
    stock,
    productImage,
    image,
    featured,
    imageRatio,
  } = product;

  const imageSrc = productImage || image;
  const quantity = Number(stock) || 0;
  const inStock = quantity > 0;
  const lowStock = quantity > 0 && quantity <= 5;

  const imageAspect =
    imageRatio === "portrait"
      ? "aspect-[4/5]"
      : imageRatio === "landscape"
        ? "aspect-[5/4]"
        : "aspect-square";

  const openProduct = () => onQuickView?.(product);

  return (
    <article className="product-card group mb-0 break-inside-avoid">
      <button
        type="button"
        onClick={openProduct}
        aria-label={`Quick view ${name || "product"}`}
        className={`product-card-image relative block w-full text-left p-1 pb-0 ${imageAspect}`}
      >
        {imageSrc && !imageError ? (
          <span className="relative flex rounded-xl overflow-hidden">
            <img
              src={imageSrc}
              alt={name || "Olison product"}
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-gray-200 text-muted rounded-xl overflow-hidden">
            <Package size={38} strokeWidth={1.2} />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
            <CircleStar size={16} />
            Featured
          </span>
        )}

        {!inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
            Sold out
          </span>
        )}

        {lowStock && (
          <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-bold text-black">
            Only {quantity} left
          </span>
        )}

        {inStock && !lowStock && (
          <span className="absolute left-3 bottom-3 shrink-0 text-[10px] font-medium text-success">
            In stock
          </span>
        )}

        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-text opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </span>
      </button>

      <div className="p-2 px-2.5">
        <button
          type="button"
          onClick={openProduct}
          className="block w-full text-left"
        >
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-text transition-colors group-hover:text-primary sm:text-sm">
            {name || "Unnamed Product"}
          </h3>
        </button>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p className="text-sm font-normal tracking-tight text-text sm:text-base">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </article>
  );
}
