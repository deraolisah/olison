import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectCartTotal, clearCart } from "../store/slices/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to Paystack / backend / email
    setSubmitted(true);
    dispatch(clearCart());
    setTimeout(() => navigate("/"), 4000);
  };

  if (submitted) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-primary">Order received! 🎉</h2>
        <p className="mt-4 text-text/70">
          Thank you, {form.name}. We'll contact you shortly to confirm delivery.
        </p>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="py-24 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="cta mt-6 inline-flex">Shop now</Link>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container-page grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1100px]">
        <form onSubmit={onSubmit} className="card space-y-4">
          <h2 className="text-2xl">Delivery Details</h2>

          <div>
            <label className="label">Full Name</label>
            <input className="input" required value={form.name} onChange={(e) => set("name", e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" required value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </div>
          <div>
            <label className="label">Delivery Address</label>
            <textarea rows={3} className="input" required value={form.address} onChange={(e) => set("address", e.target.value)} />
          </div>

          <button className="cta w-full" type="submit">
            Place Order — ₦{total.toLocaleString()}
          </button>
        </form>

        <aside className="card h-fit">
          <h3 className="text-xl mb-4">Order Summary</h3>
          <ul className="divide-y divide-gray-100">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between py-2 text-sm">
                <span>{i.name} × {i.quantity}</span>
                <span className="font-semibold">
                  ₦{(i.price * i.quantity).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 pt-4 border-t font-bold">
            <span>Total</span>
            <span className="text-primary">₦{total.toLocaleString()}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}