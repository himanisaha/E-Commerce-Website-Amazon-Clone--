import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPasswordPage() {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/reset-password/${userId}/${token}`,
        { password }
      );
      setMsg(data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 400 }}>
      <h2>Reset password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">New password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirm password</label>
          <input
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
