import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/admin/stats");
        setStats(res.data);
      } catch (err) {
        setError("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <h2>Loading dashboard...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  const { totalUsers, totalOrders, totalProducts, totalRevenue } = stats;

  return (
    <>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "20px" }}>
        <div>Total Users: {totalUsers}</div>
        <div>Total Orders: {totalOrders}</div>
        <div>Total Products: {totalProducts}</div>
        <div>Total Revenue: ₹{totalRevenue}</div>
      </div>
    </>
  );
};

export default Dashboard;
