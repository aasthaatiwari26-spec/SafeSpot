import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="login-page">

      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>

      <div className="auth-wrapper">

        {/* LEFT BRAND PANEL */}
        <div className="auth-brand-panel">

          <div className="brand-top">
            <div className="brand-mark">
              <span>✓</span>
            </div>

            <span className="brand-name">SafeSpot</span>
          </div>

          <div className="brand-content">

            <p className="brand-label">
              WELCOME BACK
            </p>

            <h2>
              Your safety,
              <span>always within reach.</span>
            </h2>

            <p className="brand-description">
              Continue your SafeSpot journey and stay connected
              with the tools designed to help you stay informed,
              prepared and safe.
            </p>

            <div className="brand-features">

              <div className="brand-feature">
                <div className="feature-icon">01</div>
                <div>
                  <strong>Check safer places</strong>
                  <p>Explore safety information before travelling.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">02</div>
                <div>
                  <strong>Stay connected</strong>
                  <p>Keep your trusted safety circle informed.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">03</div>
                <div>
                  <strong>Get help quickly</strong>
                  <p>Access emergency tools whenever you need them.</p>
                </div>
              </div>

            </div>

          </div>

          <div className="brand-bottom">
            <span className="brand-line"></span>
            <span>Know before you go.</span>
          </div>

        </div>

        {/* LOGIN FORM */}
        <div className="auth-form-panel">

          <div className="login-card">

            <div className="mobile-brand">
              <div className="brand-mark">
                <span>✓</span>
              </div>

              <span>SafeSpot</span>
            </div>

            <div className="login-header">

              <p className="form-label">
                WELCOME BACK
              </p>

              <h1>Sign in to SafeSpot</h1>

              <p>
                Access your account and continue your safer journey.
              </p>

            </div>

            <form
              className="login-form"
              onSubmit={handleLogin}
            >

              <div className="form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

              </div>

              <div className="form-group">

                <div className="password-label-row">
                  <label>Password</label>

                  <Link
                    to="/forgot-password"
                    className="forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              <button
                className="login-button"
                type="submit"
              >
                <span>Login to SafeSpot</span>
                <span className="button-arrow">→</span>
              </button>

            </form>

            <div className="login-footer">
              <span>Don't have an account?</span>

              <Link to="/signup">
                Create an account
              </Link>
            </div>

            <p className="auth-privacy">
              Your information is kept private and secure.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;