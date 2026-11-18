
import ProductCard from "./ProductCard";

export default function ProductMasonry({ products = [], columns = 4, onQuickView }) {
  if (!products.length) return null;

  return (
    <div
      className="product-masonry"
      style={{ "--masonry-columns": columns }}
    >
      {products.map((product) => (
        <div
          key={product.id || product._id}
          className="product-masonry-item"
        >
          <ProductCard product={product} onQuickView={onQuickView} />
        </div>
      ))}
    </div>
  );
}
