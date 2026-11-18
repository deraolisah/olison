import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((s) =>
    s.products.items.find((p) => String(p.id) === String(id))
  );

  if (!product) {
    return (
      <section className="py-24 text-center">
        <h2>Product not found</h2>
        <Link to="/shop" className="cta mt-6 inline-flex">Back to Shop</Link>
      </section>
    );
  }

  const onAdd = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <section className="py-20">
      <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-12 max-w-275">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-105 object-cover rounded-xl bg-gray-100"
          onError={(e) => (e.target.src = "/img/placeholder.png")}
        />

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
            <Link to="/shop" className="btn-ghost">← Back to Shop</Link>
          </div>
        </div>
      </div>
    </section>
  );
}