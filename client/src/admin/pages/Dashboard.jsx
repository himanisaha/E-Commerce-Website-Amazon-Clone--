// client/src/admin/Dashboard.jsx (or AdminDashboard.jsx)
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `${baseURL}/api/admin/stats/summary`,
          { headers: { Authorization: `Bearer ${adminToken}` } }
        );
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats", err);
      } finally {
        setLoading(false);
      }
    };

    if (adminToken) fetchStats();
  }, [adminToken, baseURL]);

  if (loading || !stats) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="d-flex flex-wrap gap-3 mt-3">
        <div className="card p-3">
          <h6>Total Users</h6>
          <strong>{stats.usersCount}</strong>
        </div>
        <div className="card p-3">
          <h6>Total Orders</h6>
          <strong>{stats.ordersCount}</strong>
        </div>
        <div className="card p-3">
          <h6>Total Products</h6>
          <strong>{stats.productsCount}</strong>
        </div>
        <div className="card p-3">
          <h6>Total Revenue</h6>
          <strong>₹{stats.totalRevenue}</strong>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
