import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h4>Your Amazon Cart is empty</h4>
        <p className="text-muted">
          Add items to your cart to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h4 className="mb-4">Shopping Cart</h4>

      <div className="row">
        {/* LEFT: ITEMS */}
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item._id} className="card mb-3 p-3 shadow-sm">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `http://localhost:8000${item.image}`
                    }
                    alt={item.title}
                    style={{ height: 120, objectFit: "contain" }}
                  />
                </div>

                <div className="col-md-6">
                  <h6>{item.title}</h6>
                  <p className="text-muted small mb-1">
                    Category: {item.category}
                  </p>

                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => decreaseQty(item._id)}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>

                    <button
                      className="btn btn-link text-danger btn-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="col-md-3 text-end fw-bold">
                  ₹{(item.price * item.qty).toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: SUMMARY */}
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6>
              Subtotal ({cartItems.reduce((s, i) => s + i.qty, 0)} items):
            </h6>
            <h5 className="fw-bold text-danger">
              ₹{subtotal .toFixed(0)}
            </h5>
            <button
              type="button"
              className="btn btn-warning w-100 mt-3"
              onClick={() => {
                console.log("Proceed clicked from CartPage");
                navigate("/payment");
              }}
            >
              Proceed to Buy
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
