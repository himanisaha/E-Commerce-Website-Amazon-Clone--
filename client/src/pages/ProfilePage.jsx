// client/src/pages/ProfilePage.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../api/baseUrl"; 


function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  // ✅ password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    axios
      .get(`${BASE_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setForm({ name: res.data.name, email: res.data.email });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");

    await axios.put(`${BASE_URL}/api/users/me`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedUser = { ...user, name: form.name, email: form.email };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated");
  };

  // ✅ change password handler (updated)
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");

      await axios.put(
        `${BASE_URL}/api/users/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPwdMsg("Password updated");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPwdMsg(
        err.response?.data?.message || "Failed to update password"
      );
    }
  };

  if (loading) return null;

  return (
    <div className="container my-4">
      <h4>Your Account</h4>

      <div className="border rounded p-3 mb-4" style={{ maxWidth: "500px" }}>
        <h5>Profile details</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Save changes
          </button>
        </form>
      </div>

      {/* ✅ Change password section (updated layout) */}
      <div className="border rounded p-3" style={{ maxWidth: "500px" }}>
        <section className="mt-1">
          <h5>Change password</h5>
          <form onSubmit={handleChangePassword} style={{ maxWidth: 400 }}>
            <div className="mb-2">
              <label className="form-label">Current password</label>
              <input
                type="password"
                className="form-control"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">New password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-warning btn-sm mt-1"
            >
              Save changes
            </button>
            {pwdMsg && <div className="small mt-2">{pwdMsg}</div>}
          </form>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
