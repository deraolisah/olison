
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Package,
  Sparkles,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

const formatCategory = (category) =>
  (category || "General").replaceAll("_", " ");

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  if (!product) return null;

  const {
    id,
    _id,
    name,
    price,
    category,
    stock,
    image,
    featured,
    imageRatio,
  } = product;

  const productId = id || _id;
  const productUrl = productId ? `/product/${productId}` : "/shop";

  const quantity = Number(stock) || 0;
  const inStock = quantity > 0;
  const lowStock = quantity > 0 && quantity <= 5;

  const imageAspect =
    imageRatio === "portrait"
      ? "aspect-[4/5]"
      : imageRatio === "landscape"
        ? "aspect-[5/4]"
        : "aspect-square";

  return (
    <article className="product-card group mb-4 break-inside-avoid">
      {/* IMAGE */}
      <Link
        to={productUrl}
        className={`product-card-image relative block ${imageAspect}`}
      >
        {image && !imageError ? (
          <img
            src={image}
            alt={name || "Olison product"}
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-alt text-muted">
            <Package size={38} strokeWidth={1.2} />
          </div>
        )}

        {/* IMAGE OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* FEATURED BADGE */}
        {featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
            <Sparkles size={11} />
            Featured
          </span>
        )}

        {/* STOCK BADGE */}
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

        {/* VIEW ACTION */}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-text opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </span>
      </Link>

      {/* PRODUCT DETAILS */}
      <div className="px-1 pb-2 pt-3">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="truncate text-[10px] font-bold uppercase tracking-[1.2px] text-muted sm:text-[11px]">
            {formatCategory(category)}
          </span>

          {inStock && !lowStock && (
            <span className="shrink-0 text-[10px] font-medium text-success">
              In stock
            </span>
          )}
        </div>

        <Link to={productUrl}>
          <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-text transition-colors group-hover:text-primary sm:text-sm">
            {name || "Unnamed Product"}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-sm font-bold tracking-tight text-text sm:text-base">
            {formatPrice(price)}
          </p>

          <Link
            to={productUrl}
            aria-label={`View ${name || "product"}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-text transition hover:bg-primary hover:text-white"
          >
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
