import React, { useState, useEffect } from "react";
import "./ProfileSettings.css";

function ProfileSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://https://safespot-backend-ltud.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (response.ok) {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const body = { name, email, phone };
      if (password) body.password = password;

      const response = await fetch("http://https://safespot-backend-ltud.onrender.com/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile settings saved successfully.");
        setPassword("");

        // localStorage ka user data bhi update kar do taaki Dashboard pe naya naam dikhe
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="profile-page">

      <section className="profile-hero">
        <div className="profile-hero-content">
          <p className="profile-tag">PROFILE & SETTINGS</p>

          <h1>
            Manage Your <span>SafeSpot Profile</span>
          </h1>

          <p>
            Update your profile information and manage your
            safety preferences in one place.
          </p>
        </div>
      </section>


      <section className="profile-section">
        <div className="profile-container">

          {/* PROFILE INFORMATION */}

          <div className="profile-card">

            <div className="profile-heading">
              <p className="section-tag">PROFILE INFORMATION</p>

              <h2>Your Details</h2>

              <p>
                Keep your basic information up to date.
              </p>
            </div>


            <form onSubmit={handleSave}>

              <div className="form-group">
                <label>Full Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>


              <div className="form-group">
                <label>Email Address</label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>


              <div className="form-group">
                <label>Phone Number</label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>New Password (optional)</label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>


              {message && (
                <p className="profile-message">
                  {message}
                </p>
              )}


              <button
                type="submit"
                className="save-profile-btn"
              >
                Save Changes
              </button>

            </form>

          </div>


          {/* SAFETY PREFERENCES */}

          <div className="settings-card">

            <div className="settings-heading">
              <p className="section-tag">SAFETY PREFERENCES</p>

              <h2>Manage Your Preferences</h2>

              <p>
                Control how SafeSpot features work for you.
              </p>
            </div>


            <div className="setting-item">

              <div>
                <h3>Safety Notifications</h3>

                <p>
                  Receive important safety-related notifications.
                </p>
              </div>


              <label className="toggle">

                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() =>
                    setNotifications(!notifications)
                  }
                />

                <span className="toggle-slider"></span>

              </label>

            </div>


            <div className="setting-item">

              <div>
                <h3>Location Sharing</h3>

                <p>
                  Allow SafeSpot features to use your location
                  when required.
                </p>
              </div>


              <label className="toggle">

                <input
                  type="checkbox"
                  checked={locationSharing}
                  onChange={() =>
                    setLocationSharing(!locationSharing)
                  }
                />

                <span className="toggle-slider"></span>

              </label>

            </div>

          </div>

        </div>
      </section>


      {/* PRIVACY & SECURITY */}

      <section className="profile-note-section">

        <div className="profile-note">

          <h2>Privacy & Security</h2>

          <p>
            Keep your account information private and only share
            your personal details with people you trust.
          </p>

        </div>

      </section>

    </div>
  );
}

export default ProfileSettings;