// client/src/admin/Orders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/orders");
      setOrders(res.data);
    } catch (err) {
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
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status: newStatus }
      );
      loadOrders(); // reload list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <h2>Loading orders...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div>
      <h2>Order Management</h2>
      <table border="1" cellPadding="8" style={{ marginTop: "16px", width: "100%" }}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Placed At</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.user?.email}</td>
              <td>₹{o.totalAmount}</td> {/* change field if needed */}
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o._id, e.target.value)}
                >
                  <option value="Placed">Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

