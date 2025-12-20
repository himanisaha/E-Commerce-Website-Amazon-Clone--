import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminReports() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/orders`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        // show latest 10 orders
        setOrders(data.slice(-10).reverse());
      } catch (err) {
        console.error("Failed to load reports", err);
      } finally {
        setLoading(false);
      }
    };
    if (adminToken) fetchData();
  }, [adminToken, baseURL]);

  if (loading) return <div>Loading reports...</div>;

  return (
    <div>
      <h1>Reports</h1>

      <h5 className="mt-3">Recent orders</h5>
      {orders.length === 0 ? (
        <p>No orders to show.</p>
      ) : (
        <table className="table table-sm mt-2">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>User</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{new Date(o.createdAt).toLocaleString()}</td>
                <td>{o.userId?.name || "Unknown"}</td>
                <td>₹{o.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h5 className="mt-4">Top products (future)</h5>
      <p className="text-muted">
        Placeholder for charts and detailed sales analytics.  
        Current version focuses on recent orders and summary metrics.
      </p>
    </div>
  );
}

export default AdminReports;

