import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Package,
  CircleStar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

export default function ProductCard({ product, onQuickView }) {
  const [imageError, setImageError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  if (!product) return null;

  const { name, price, stock, featured, imageRatio } = product;

  const images = Array.isArray(product.productImages)
    ? product.productImages.filter(Boolean)
    : [];

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

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    track.scrollTo({
      left: clamped * track.clientWidth,
      behavior: "smooth",
    });
    setActiveIndex(clamped);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== activeIndex) setActiveIndex(index);
  };

  useEffect(() => {
    if (images[1]) { const img = new Image(); img.src = images[1]; }
  }, [images]);

  return (
    <article className="product-card group mb-0 break-inside-avoid">
      <div style={{ touchAction: "pan-y" }} 
        className={`product-card-image relative z-0 block w-full text-left p-1 pb-0 ${imageAspect}`}
      >
        {/* Clickable image area */}
        <button
          type="button"
          onClick={openProduct}
          aria-label={`Quick view ${name || "product"}`}
          className="absolute inset-0 z-10 rounded-xl"
        />

        {images.length > 0 && !imageError ? (
          <>
            <div
              ref={trackRef}
              onScroll={handleScroll}
              className="relative flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden rounded-xl scrollbar-hide"
              style={{ scrollbarWidth: "none" }}
            >
              {images.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative h-full w-full shrink-0 snap-start overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`${name || "Product"} — view ${i + 1}`}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    onError={() => i === 0 && setImageError(true)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Gradient on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent transition-opacity duration-300 opacity-100" />
                </div>
              ))}
            </div>


            {/* Arrows (desktop hover, only if >1 image) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToIndex(activeIndex - 1);
                  }}
                  disabled={activeIndex === 0}
                  className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text opacity-0 shadow-md transition hover:bg-white disabled:opacity-0 group-hover:opacity-100 sm:opacity-0"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToIndex(activeIndex + 1);
                  }}
                  disabled={activeIndex === images.length - 1}
                  className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-text opacity-0 shadow-md transition hover:bg-white disabled:opacity-0 group-hover:opacity-100 sm:opacity-0"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="pointer-events-none absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex
                          ? "w-4 bg-white"
                          : "w-1.5 bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-gray-200 text-muted">
            <Package size={38} strokeWidth={1.2} />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        )}

        {/* Badges (pointer-events-none so they don't block swipe) */}
        <div className="pointer-events-none absolute inset-0 z-20">
          {/* {featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur">
              <CircleStar size={16} />
              Featured
            </span>
          )} */}

          {!inStock && (
            <span className="absolute right-3 top-3 rounded-full bg-black/75 px-3 py-1.25 text-[10px] font-semibold text-white backdrop-blur">
              Sold out
            </span>
          )}

          {lowStock && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1.5 text-[10px] font-bold text-black">
              Only {quantity} left
            </span>
          )}

          {inStock && !lowStock && (
            <span className="absolute bottom-3 left-3 rounded-full px-3 py-1 shrink-0 text-[10px] font-medium text-white bg-success/25 backdrop-blur-md">
              In stock
            </span>
          )}

          <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-text opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={19} />
          </span>
        </div>
      </div>

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