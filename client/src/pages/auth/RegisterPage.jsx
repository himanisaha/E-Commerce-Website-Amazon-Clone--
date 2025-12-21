import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // can reuse LoginPage.css if you like

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/users/register`, {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="amazon-auth-page">
      {/* header with logo */}
      <header className="amazon-auth-header py-3">
        <div className="container d-flex justify-content-center">
          <img
            src={`${API_BASE_URL}/logos/amazon-logo.png`}
            alt="Amazon"
            className="amazon-auth-logo"
          />
        </div>
      </header>

      {/* center card */}
      <main className="amazon-auth-main">
        <div className="container d-flex justify-content-center">
          <div className="amazon-auth-card border rounded-3 p-4">
            <h1 className="h4 mb-3">Create account</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Your name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <small className="text-muted">
                  Passwords must be at least 6 characters.
                </small>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 btn-sm amazon-auth-submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create your Amazon Clone account"}
              </button>

              <p className="amazon-auth-terms mt-3 small">
                By creating an account, you agree to Amazon&apos;s Conditions of
                Use and Privacy Notice.
              </p>
            </form>

            <p className="small mt-3">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </main>

      {/* footer same as login */}
      <footer className="amazon-auth-footer mt-5 py-3">
        <div className="container text-center">
          <div className="small mb-2">
            <a href="#" className="mx-2">
              Conditions of Use
            </a>
            <a href="#" className="mx-2">
              Privacy Notice
            </a>
            <a href="#" className="mx-2">
              Help
            </a>
          </div>
          <div className="small text-muted">
            © 2025, Amazon Clone, built for learning
          </div>
        </div>
      </footer>
    </div>
  );
}
