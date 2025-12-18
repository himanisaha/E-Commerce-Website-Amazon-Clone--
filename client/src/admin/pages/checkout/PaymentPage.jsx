import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../../context/CartContext";

function PaymentPage() {
  const { cartItems } = useContext(CartContext);
  const [method, setMethod] = useState("card");
  const navigate = useNavigate();

  const itemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  useEffect(() => {
    if (!cartItems.length) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return navigate("/cart");

    try {
      const token = localStorage.getItem("userToken");
      if (!token) return navigate("/login");

      await axios.post(
        "http://localhost:8000/api/orders",
        {
          items: cartItems.map((item) => ({
            productId: item._id,
            qty: item.qty,
          })),
          totalPrice: subtotal,
          paymentMethod: method,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Payment / order failed");
    }
  };

  // ⬇️ your previous JSX goes here
  return (
    <div style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}>
      <div className="container py-4" style={{ maxWidth: "1000px" }}>
        <div className="row">
          {/* LEFT: payment section */}
          <div className="col-md-8">
            <div
              className="bg-white p-4 mb-3"
              style={{ boxShadow: "0 2px 4px rgba(15,17,17,.15)" }}
            >
              <h1
                className="mb-3"
                style={{ fontSize: "28px", fontWeight: 500 }}
              >
                Payment
              </h1>

              <h5
                className="mb-3"
                style={{ fontSize: "18px", fontWeight: 500 }}
              >
                Select a payment method
              </h5>

              <form onSubmit={handleSubmit}>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="pm-card"
                    value="card"
                    checked={method === "card"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="pm-card">
                    Credit or Debit card
                  </label>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="pm-cod"
                    value="cod"
                    checked={method === "cod"}
                    onChange={(e) => setMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="pm-cod">
                    Cash on delivery
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{
                    backgroundColor: "#f0c14b",
                    borderColor: "#a88734 #9c7e31 #846a29",
                    color: "#111",
                    fontWeight: 500,
                  }}
                >
                  Continue
                </button>
              </form>

            </div>
          </div>

          {/* RIGHT: order summary */}
          <div className="col-md-4">
            <div
              className="bg-white p-3"
              style={{ boxShadow: "0 2px 4px rgba(15,17,17,.15)", borderRadius: 4 }}
            >
              <h5
                className="mb-2"
                style={{ fontSize: "18px", fontWeight: 500 }}
              >
                Order summary
              </h5>
              <p className="mb-1" style={{ fontSize: "14px" }}>
                Items ({itemsCount}):{" "}
                <span style={{ fontWeight: 600 }}>
                  ₹{subtotal .toFixed(0)}
                </span>
              </p>
              <hr className="my-2" />
              <p
                className="mb-0"
                style={{ color: "#b12704", fontWeight: 700, fontSize: "18px" }}
              >
                Order total: ₹{subtotal .toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
