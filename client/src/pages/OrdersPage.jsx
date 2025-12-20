// client/src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get("http://localhost:8000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch(console.error);
  }, []);

  return (
    <div className="container my-4">
      <h4>Your Orders</h4>
      {orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div key={order._id} className="border rounded p-3 mb-3">
          <div className="d-flex justify-content-between">
            <div>
              <div className="fw-semibold">Order ID: {order._id}</div>
              <div>
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </div>
              <div>Status: {order.status}</div>
            </div>
            <div className="text-end">
              <div className="fw-semibold">Total: ₹{order.totalAmount}</div>
              <div>Payment: {order.paymentMethod}</div>
            </div>
          </div>

          <hr />

          {Array.isArray(order.items) &&
            order.items.map((item) => {
              console.log("order item:", item);   // add this

              const imgPath = item.image || "";
              const fullUrl = imgPath
                ? `http://localhost:8000${imgPath.startsWith("/") ? imgPath : `/products/${imgPath}`
                }`
                : "";

              return (
                <div
                  key={item._id || item.productId}
                  className="d-flex align-items-center mb-2"
                >
                  {fullUrl && (
                    <img
                      src={fullUrl}
                      alt={item.name}
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                      className="me-3"
                    />
                  )}
                  <div className="flex-grow-1">
                    <div>{item.name}</div>
                    <div className="text-muted">
                      Qty: {item.quantity} &nbsp;|&nbsp; Price: ₹{item.price}
                    </div>
                  </div>
                </div>
              );
            })}


        </div>
      ))}
    </div>
  );
}

export default OrdersPage;
