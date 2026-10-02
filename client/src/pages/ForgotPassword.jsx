import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      setSuccess(false);
      return;
    }

    setError("");
    setSuccess(true);
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        <div className="forgot-header">
          <div className="forgot-icon">🔐</div>

          <h1>Forgot Password?</h1>

          <p>
            Enter your registered email address and we'll help you
            reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-form">

          <div className="form-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
                setSuccess(false);
              }}
            />
          </div>

          <button
            type="submit"
            className="forgot-button"
          >
            Send Reset Link
          </button>

          {error && (
            <div className="forgot-error">
              {error}
            </div>
          )}

          {success && (
            <div className="forgot-success">
              Password reset link has been sent to your email.
            </div>
          )}

        </form>

        <div className="forgot-footer">
          <Link to="/login">
            ← Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;
