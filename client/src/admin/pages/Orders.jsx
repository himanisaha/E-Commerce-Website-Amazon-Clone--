// client/src/pages/admin/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../api/baseUrl";

const Orders = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${BASE_URL}/api/admin/orders/${orderId}/status`,
        { type: newStatus, note: "" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      loadOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  const getCurrentStatus = (order) => {
    if (!order.orderStatus || order.orderStatus.length === 0) {
      return order.status || "Placed";
    }
    return order.orderStatus[order.orderStatus.length - 1].type;
  };

  if (loading) return <h2>Loading orders...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div>
      <h2>Order Management</h2>
      <table
        border="1"
        cellPadding="8"
        style={{ marginTop: "16px", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Placed At</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const latestStatus = getCurrentStatus(o);

            return (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.user?.email || o.user?.name || "Unknown"}</td>
                <td>₹{o.totalPrice}</td>
                <td>{latestStatus}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>
                  <Link to={`/orders/${o._id}`}>View details</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
