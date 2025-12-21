// client/src/pages/OrderDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../api/baseUrl"; 


function OrderDetails() {
  const { id } = useParams();               // /orders/:id
  const location = useLocation();
  const { token } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orders/${id}`, {
         headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  // scroll to timeline when URL has #track
  useEffect(() => {
    if (location.hash === "#track") {
      const el = document.getElementById("track");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  if (loading) return <h2>Loading order...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!order) return <h2>Order not found</h2>;

  return (
    <div className="container my-4">
      <h2>Order Details</h2>

      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Total:</strong> ₹{order.totalPrice}
      </p>
      <p>
        <strong>Placed at:</strong>{" "}
        {new Date(order.createdAt).toLocaleString()}
      </p>

      {/* Delivery address */}
      {order.shippingAddress && (
        <>
          <h5 className="mt-3">Delivery address</h5>
          <p>
            {order.shippingAddress.fullName}
            <br />
            {order.shippingAddress.addressLine1}
            {order.shippingAddress.addressLine2 && (
              <>
                <br />
                {order.shippingAddress.addressLine2}
              </>
            )}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.postalCode}
            <br />
            Phone: {order.shippingAddress.phone}
          </p>
        </>
      )}

      {/* Items */}
      <h5 className="mt-4">Items</h5>
      <ul>
        {order.items.map((item) => (
          <li key={item._id || item.product}>
            {item.qty} × ₹{item.price}
          </li>
        ))}
      </ul>

      {/* Order timeline (track section) */}
      <section id="track" className="mt-4">
        <h5>Order timeline</h5>
        <ul className="list-unstyled">
          {order.orderStatus.map((s) => (
            <li key={s._id || s.date}>
              <strong>{s.type}</strong>{" "}
              <span className="text-muted">
                {new Date(s.date).toLocaleString()}
              </span>
              {s.note && <> – {s.note}</>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default OrderDetails;
