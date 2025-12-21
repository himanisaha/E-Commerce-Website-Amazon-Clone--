// client/src/pages/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios
      .get(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data || []))
      .catch(console.error);
  }, []);

  const getCurrentStatus = (order) => {
    if (!order.orderStatus || order.orderStatus.length === 0) {
      return order.status || "Placed";
    }
    return order.orderStatus[order.orderStatus.length - 1].type;
  };

  return (
    <div className="container my-4">
      {/* page heading similar to Amazon */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Your Orders</h3>
        <div className="text-muted small">({orders.length} orders)</div>
      </div>

      {orders.length === 0 && <p>No orders placed yet.</p>}

      {orders.map((order) => {
        const currentStatus = getCurrentStatus(order);
        const addr = order.shippingAddress || {};
        const firstItem = Array.isArray(order.items) ? order.items[0] : null;

        // image url like before
        let thumbUrl = "";
        if (firstItem && firstItem.image) {
          const imgPath = firstItem.image;
          thumbUrl = `${API_BASE_URL}${imgPath.startsWith("/") ? imgPath : `/products/${imgPath}`}`;
        }

        return (
          <div
            key={order._id}
            className="border rounded-3 mb-3"
            style={{ backgroundColor: "#fff" }}
          >
            {/* top bar: date + total + status */}
            <div
              className="px-3 py-2 border-bottom"
              style={{ backgroundColor: "#f0f2f2" }}
            >
              <div className="d-flex flex-wrap small">
                <div className="me-4">
                  <span className="text-muted">ORDER PLACED</span>
                  <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="me-4">
                  <span className="text-muted">TOTAL</span>
                  <div>₹{order.totalPrice}</div>
                </div>
                <div className="me-4">
                  <span className="text-muted">SHIP TO</span>
                  <div>{addr.fullName || "-"}</div>
                </div>
                <div className="ms-auto">
                  <span className="text-muted">ORDER ID</span>
                  <div className="text-truncate" style={{ maxWidth: 220 }}>
                    {order._id}
                  </div>
                </div>
              </div>
            </div>

            {/* bottom section: item row + actions */}
            <div className="p-3">
              <div className="d-flex">
                {/* thumbnail */}
                {thumbUrl && (
                  <div className="me-3">
                    <img
                      src={thumbUrl}
                      alt={firstItem?.name}
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                )}

                {/* main info */}
                <div className="flex-grow-1">
                  <div className="mb-1 fw-semibold">{currentStatus}</div>
                  <div className="mb-1">
                    {firstItem?.name}
                    {order.items.length > 1 &&
                      ` (+${order.items.length - 1} more items)`}
                  </div>
                  <div className="small text-muted">
                    Deliver to:{" "}
                    {addr.addressLine1
                      ? `${addr.addressLine1}, ${addr.city || ""} ${addr.postalCode || ""
                      }`
                      : "-"}
                  </div>

                  {/* action links like Amazon */}
                  <div className="mt-2 d-flex flex-wrap small">
                    <Link to={`/orders/${order._id}`} className="me-3">
                      View order details
                    </Link>
                    <Link to={`/orders/${order._id}#track`} className="me-3">
                      Track package
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersPage;
