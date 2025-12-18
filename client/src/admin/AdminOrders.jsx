import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        console.log("AdminOrders token =", token);

        const { data } = await axios.get(
          "http://localhost:8000/api/orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("AdminOrders data =", data);
        setOrders(data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name || "Unknown"}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminOrders;
