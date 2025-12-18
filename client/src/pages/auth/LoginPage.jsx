import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // adjust path if different
import "./LoginPage.css"; // custom overrides

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      // optional: show backend message if present
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="amazon-auth-page">
      {/* Top logo */}
      <header className="amazon-auth-header py-1">
        <div className="container d-flex justify-content-center">
          <img
            src="public/images/logos/amazon-logo.png" // put your logo file in public/images or src and update path
            alt="Amazon"
            className="amazon-auth-logo"
          />
        </div>
      </header>

      {/* Center card */}
      <main className="amazon-auth-main">
        <div className="container d-flex justify-content-center">
          <div className="amazon-auth-card border rounded-3 p-4">
            <h1 className="h4 mb-3">Sign in</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small">
                  Email or mobile phone number
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 btn-sm amazon-auth-submit"
              >
                Continue
              </button>

              <p className="amazon-auth-terms mt-3 small">
                By continuing, you agree to Amazon&apos;s Conditions of Use and
                Privacy Notice.
              </p>
            </form>

            <a href="#" className="amazon-auth-help-link small">
              Need help?
            </a>
          </div>
        </div>

        {/* Divider and create account button */}
        <div className="container mt-3 text-center">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <div className="flex-grow-1 border-top" />
            <span className="mx-2 small text-muted">
              New to Amazon?
            </span>
            <div className="flex-grow-1 border-top" />
          </div>

          <button
            type="button"
            className="btn btn-light border btn-sm amazon-auth-create-btn"
            onClick={() => navigate("/register")}
          >
            Create your Amazon account
          </button>
        </div>
      </main>

      {/* Footer */}
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

export default LoginPage;
