import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(
        "http://https://safespot-backend-ltud.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("Server error: " + error.message);
    }
  };

  return (
    <div className="signup-page">

      {/* Decorative background */}
      <div className="auth-orb auth-orb-one"></div>
      <div className="auth-orb auth-orb-two"></div>

      <div className="auth-wrapper">

        {/* BRANDING */}
        <div className="auth-brand-panel">

          <div className="brand-top">
            <div className="brand-mark">
              <span>✓</span>
            </div>

            <span className="brand-name">SafeSpot</span>
          </div>

          <div className="brand-content">
            <p className="brand-label">YOUR SAFETY. YOUR CONTROL.</p>

            <h2>
              Create a safer
              <span> digital journey.</span>
            </h2>

            <p className="brand-description">
              Join SafeSpot to discover safer places, manage your
              safety circle and stay connected when it matters.
            </p>

            <div className="brand-features">

              <div className="brand-feature">
                <div className="feature-icon">01</div>
                <div>
                  <strong>Stay informed</strong>
                  <p>Know the safety of places before you go.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">02</div>
                <div>
                  <strong>Stay connected</strong>
                  <p>Keep your trusted contacts close.</p>
                </div>
              </div>

              <div className="brand-feature">
                <div className="feature-icon">03</div>
                <div>
                  <strong>Stay prepared</strong>
                  <p>Access important safety tools when needed.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="brand-bottom">
            <span className="brand-line"></span>
            <span>Know before you go.</span>
          </div>

        </div>

        {/* FORM */}
        <div className="auth-form-panel">

          <div className="signup-card">

            <div className="mobile-brand">
              <div className="brand-mark">
                <span>✓</span>
              </div>
              <span>SafeSpot</span>
            </div>

            <div className="signup-header">
              <p className="form-label">GET STARTED</p>

              <h1>Create your account</h1>

              <p>
                Set up your SafeSpot account in just a few steps.
              </p>
            </div>

            <form
              className="signup-form"
              onSubmit={handleSubmit}
            >

              <div className="form-row">

                <div className="form-group">
                  <label>Full Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">

                <div className="form-group">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              {error && (
                <p className="signup-error">
                  {error}
                </p>
              )}

              <button
                className="signup-button"
                type="submit"
              >
                <span>Create Account</span>
                <span className="button-arrow">→</span>
              </button>

            </form>

            <div className="signup-footer">
              <span>Already have an account?</span>
              <Link to="/login">Login</Link>
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

export default Signup;