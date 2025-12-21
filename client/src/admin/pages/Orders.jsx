// client/src/admin/Orders.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../api/baseUrl";

const Orders = () => {
  const { token } = useContext(AuthContext);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const baseURL = import.meta.env.VITE_API_URL || "https://e-commerce-website-amazon-clone-production-8d74.up.railway.app";


const loadOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
      `${baseURL}/api/admin/orders/${orderId}/status`,
      { type: newStatus, note: "" }, // optional note
      { headers: { Authorization: `Bearer ${token}` } }
    );

    loadOrders(); // reload list
  } catch (err) {
    alert("Failed to update status");
  }
};

const getCurrentStatus = (order) => {
  if (!order.orderStatus || order.orderStatus.length === 0) {
    // fallback for old orders that still have `status`
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
          <th>Change Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => {
          const latestStatus = o.orderStatus && o.orderStatus.length
            ? o.orderStatus[o.orderStatus.length - 1].type
            : o.status || "Placed"; // fallback for old orders

          return (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>₹{o.totalPrice}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>{latestStatus}</td>
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
