import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectCartTotal,
  toggleCart,
  setCartOpen,
  removeFromCart,
  updateQuantity,
} from "../../redux/slices/cartSlice";
import { X } from "lucide-react";

const CartDrawer = () => {
  const isOpen = useSelector((s) => s.cart.isOpen);
  const items = useSelector((s) => s.cart.items);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 z-30 md:z-100 pointer-events-none">
      {isOpen && (
        <button
          type="button"
          aria-label="Close Cart"
          className="absolute z-30 inset-0 bg-black/50 pointer-events-auto"
          // onClick={() => dispatch(toggleCart())}
          onClick={() => dispatch(setCartOpen(false))}
        />
      )}
      <aside
        className={`
        fixed z-30 right-0 
        top-0
        flex flex-col
        h-full w-full max-w-sm
        bg-white shadow-2xl
        rounded-l-3xl md:rounded-none
        transition-transform pointer-events-auto
          ${isOpen
            ? "translate-x-0"
            : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 h-14 border-b border-primary/10">
          <h3 className="text-xl font-semibold"> Cart </h3>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          <button
            // onClick={() => dispatch(toggleCart())}
            onClick={() => dispatch(setCartOpen(false))}
            className="text-2xl text-gray-400 hover:text-text"
            aria-label="Close cart"
          >
            {/* × */}
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 && (
            <div className="flex flex-col items-center gap-1 my-16">
              {/* <p className="text-center text-text/50">Cart is empty</p> */}
              <p className="text-sm font-semibold text-text">Your cart is empty</p>
              <p className="mt-1 text-xs text-muted">Add products to get started.</p>
            </div>
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

        <div className="p-4 border-t border-border space-y-3 pb-18 md:pb-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">₦{total.toLocaleString()}</span>
          </div>
          <Link
            to="/checkout"
            // onClick={() => dispatch(toggleCart())}
            onClick={() => dispatch(setCartOpen(false))}
            className="cta w-full rounded-full py-2.5"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default CartDrawer;