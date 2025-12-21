import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/baseUrl";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const adminToken = localStorage.getItem("adminToken");

  // Get latest status from orderStatus timeline
  const getCurrentStatus = (order) => {
    if (!order.orderStatus || order.orderStatus.length === 0) {
      return "Placed";
    }
    return order.orderStatus[order.orderStatus.length - 1].type || "Placed";
  };

  const handleStatusChange = async (orderId, status, note = "") => {
    try {
      // Update status
      await axios.put(
        `${BASE_URL}/api/admin/orders/${orderId}/status`,
        { status, note },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );

      // Reload orders after update
      const { data } = await axios.get(`${BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      setOrders(data);
    } catch (err) {
      console.error("Failed to update status", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    if (adminToken) fetchOrders();
  }, [adminToken]);

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h1>Order Management</h1>

      {Array.isArray(orders) && orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const currentStatus = getCurrentStatus(order);
              return (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId?.name || "Unknown"}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <select
                      value={currentStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Placed">Placed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
