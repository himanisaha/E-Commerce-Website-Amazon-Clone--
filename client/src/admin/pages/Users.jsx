import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    if (adminToken) fetchUsers();
  }, [adminToken]);

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h1>Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-muted mt-2">
        Moderation actions (disable/ban) can be added as future enhancement.
      </p>
    </div>
  );
}

export default AdminUsers;
