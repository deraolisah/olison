import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartTotal,
  toggleCart,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { X } from "lucide-react";

const CartDrawer = () => {
  const isOpen = useSelector((s) => s.cart.isOpen);
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-60"
          onClick={() => dispatch(toggleCart())}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-70
                    shadow-xl transition-transform duration-300 flex flex-col
                    ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-5 h-16 border-b border-primary/10">
          <h3 className="text-xl font-semibold">Your Cart</h3>
          <button
            onClick={() => dispatch(toggleCart())}
            className="text-2xl text-gray-400 hover:text-text"
            aria-label="Close cart"
          >
            {/* × */}
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <p className="text-center text-text/50 mt-16">Cart is empty</p>
          )}
          {items.map((i) => (
            <div key={i.id} className="flex gap-3 items-start">
              <img
                src={i.image}
                alt={i.name}
                className="w-16 h-16 rounded object-cover bg-gray-100"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold line-clamp-1">{i.name}</p>
                <p className="text-primary font-bold text-sm">
                  ₦{Number(i.price).toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="w-6 h-6 border rounded"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: i.id, quantity: i.quantity - 1 })
                      )
                    }
                  >
                    −
                  </button>
                  <span className="text-sm">{i.quantity}</span>
                  <button
                    className="w-6 h-6 border rounded"
                    onClick={() =>
                      dispatch(
                        updateQuantity({ id: i.id, quantity: i.quantity + 1 })
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="text-xs text-red-500"
                onClick={() => dispatch(removeFromCart(i.id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="p-5 border-t space-y-3">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">₦{total.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            onClick={() => dispatch(toggleCart())}
            className="cta w-full rounded-full py-2.5"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;