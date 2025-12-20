// client/src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProfilePage() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    axios
      .get("http://localhost:8000/api/users/me", {
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
    await axios.put(
      "http://localhost:8000/api/users/me",
      form,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const updatedUser = { ...user, name: form.name, email: form.email };
    localStorage.setItem("userData", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("Profile updated");
  };

  if (loading) return null;

  return (
    <div className="container my-4">
      <h4>Your Account</h4>
      <div className="border rounded p-3" style={{ maxWidth: "500px" }}>
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
    </div>
  );
}

export default ProfilePage;
