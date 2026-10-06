import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [user, setUser] = useState({
    name: "SafeSpot User",
    email: "user@example.com",
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  const profileRef = useRef(null);

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser.name || "SafeSpot User",
          email: parsedUser.email || "user@example.com",
        });
      } catch (error) {
        console.error("Unable to read user information:", error);
      }
    }
  }, []);


  /* =========================
     LOAD RECENT ACTIVITY
  ========================= */

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          setLoadingActivity(false);
          return;
        }

        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser.id) {
          setLoadingActivity(false);
          return;
        }

        const response = await fetch(
          `http://https://safespot-backend-ltud.onrender.com/api/journeys/${parsedUser.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch journey activity");
        }

        const journeys = await response.json();

        const activities = journeys.slice(0, 3).map((journey) => {
          let title = "Safe Journey";

          if (journey.status === "Completed") {
            title = "Journey Completed";
          } else if (journey.status === "Cancelled") {
            title = "Journey Cancelled";
          } else {
            title = "Journey Started";
          }

          return {
            id: journey._id,
            title,
            description: `${journey.start} → ${journey.destination}`,
            date: journey.createdAt,
            status: journey.status,
          };
        });

        setRecentActivity(activities);

      } catch (error) {
        console.error("Error loading recent activity:", error);
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchRecentActivity();
  }, []);


  /* =========================
     FORMAT ACTIVITY TIME
  ========================= */

  const formatActivityTime = (date) => {
    if (!date) {
      return "";
    }

    const activityDate = new Date(date);
    const now = new Date();

    const difference = now - activityDate;

    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    }

    if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return activityDate.toLocaleDateString();
  };


  /* =========================
     GET INITIALS
  ========================= */

  const getInitials = (name) => {
    if (!name) {
      return "SU";
    }

    const words = name.trim().split(" ");

    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };


  /* =========================
     CLOSE PROFILE DROPDOWN
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className="dashboard-page">

      {/* =========================
          DASHBOARD HEADER
      ========================= */}

      <section className="dashboard-header">

        <div className="dashboard-welcome">

          <p className="dashboard-tag">
            SAFETY DASHBOARD
          </p>

          <h1>
            Welcome to SafeSpot
          </h1>

          <p>
            Stay informed, plan safely, and keep your trusted contacts close.
          </p>

        </div>


        <div className="dashboard-header-right">

          {/* PROFILE */}

          <div
            className="profile-menu"
            ref={profileRef}
          >

            <div
              className="profile-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
            >

              <div className="profile-avatar">
                {getInitials(user.name)}
              </div>

              <div className="profile-user">

                <strong>
                  {user.name}
                </strong>

                <span>
                  My Account
                </span>

              </div>

              <span className="profile-arrow">
                {profileOpen ? "▲" : "▼"}
              </span>

            </div>


            {profileOpen && (

              <div className="profile-dropdown">

                <div
                  className="profile-dropdown-header"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile-settings");
                  }}
                  style={{ cursor: "pointer" }}
                >

                  <div className="profile-avatar large">
                    {getInitials(user.name)}
                  </div>

                  <div>

                    <strong>
                      {user.name}
                    </strong>

                    <span>
                      {user.email}
                    </span>

                  </div>

                </div>


                <div className="profile-divider"></div>


                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile-settings");
                  }}
                >

                  <span className="dropdown-icon">
                    ⚙
                  </span>

                  <div>

                    <strong>
                      Profile & Settings
                    </strong>

                    <small>
                      Manage your account
                    </small>

                  </div>

                </div>


                <div
                  className="profile-dropdown-item"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/notifications");
                  }}
                >

                  <span className="dropdown-icon">
                    🔔
                  </span>

                  <div>

                    <strong>
                      Notifications
                    </strong>

                    <small>
                      View your alerts
                    </small>

                  </div>

                </div>


                <div className="profile-divider"></div>


                <div
                  className="profile-dropdown-item logout-item"
                  onClick={() => {
                    setProfileOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                >

                  <span className="dropdown-icon">
                    ↪
                  </span>

                  <div>

                    <strong>
                      Logout
                    </strong>

                    <small>
                      Sign out of SafeSpot
                    </small>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* SAFETY STATUS */}

          <div className="safety-status">

            <span className="status-dot"></span>

            <div>

              <strong>
                Safety Status
              </strong>

              <p>
                You're connected
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <section className="quick-actions">

        <div className="dashboard-card">

          <div className="card-icon">
            Map
          </div>

          <h3>
            Safety Map
          </h3>

          <p>
            Explore safety levels and reported incidents around you.
          </p>

          <button
            onClick={() => navigate("/safety-map")}
          >
            Open Map
          </button>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            Route
          </div>

          <h3>
            Safe Journey
          </h3>

          <p>
            Plan a journey and share your trip with a trusted contact.
          </p>

          <button
            onClick={() => navigate("/safe-journey")}
          >
            Plan Journey
          </button>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            Reviews
          </div>

          <h3>
            Spot Reviews
          </h3>

          <p>
            Read and share experiences about places in your area.
          </p>

          <button
            onClick={() => navigate("/reviews")}
          >
            View Reviews
          </button>

        </div>


        <div className="dashboard-card emergency-card">

          <div className="card-icon">
            SOS
          </div>

          <h3>
            Emergency Center
          </h3>

          <p>
            Quickly access emergency services and your safety contacts.
          </p>

          <button
            onClick={() => navigate("/emergency")}
          >
            Open Emergency
          </button>

        </div>

      </section>


      {/* =========================
          SAFETY CIRCLE + ACTIVITY
      ========================= */}

      <section className="dashboard-lower">

        <div className="dashboard-panel">

          <h2>
            Safety Circle
          </h2>

          <p>
            Your trusted contacts will appear here so they can be reached
            quickly during an emergency.
          </p>

          <button
            className="outline-button"
            onClick={() => navigate("/trusted-contacts")}
          >
            Manage Safety Circle
          </button>

        </div>


        <div className="dashboard-panel">

          <h2>
            Recent Activity
          </h2>


          {loadingActivity ? (

            <div className="activity">

              <strong>
                Loading activity...
              </strong>

              <p>
                Fetching your recent safety activity.
              </p>

            </div>

          ) : recentActivity.length === 0 ? (

            <div className="activity">

              <strong>
                No recent activity
              </strong>

              <p>
                Your safety activity will appear here.
              </p>

            </div>

          ) : (

            <div className="activity-list">

              {recentActivity.map((activity) => (

                <div
                  className="activity"
                  key={activity.id}
                >

                  <strong>
                    {activity.title}
                  </strong>

                  <p>
                    {activity.description}
                  </p>

                  <small>
                    {formatActivityTime(activity.date)}
                  </small>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* =========================
          MORE SAFETY TOOLS
      ========================= */}

      <section className="dashboard-tools">

        <div>

          <h2>
            More Safety Tools
          </h2>

          <p>
            Additional tools to help you stay prepared.
          </p>

        </div>


        <div className="tool-list">

          <button
            onClick={() => navigate("/report-incident")}
          >
            Report Incident
          </button>

          <button
            onClick={() => navigate("/evidence-locker")}
          >
            Evidence Locker
          </button>

          <button
            onClick={() => navigate("/community-reports")}
          >
            Community Reports
          </button>

          <button
            onClick={() => navigate("/journey-history")}
          >
            Journey History
          </button>

          <button
            onClick={() => navigate("/safety-insights")}
          >
            Safety Insights
          </button>

          <button
            onClick={() => navigate("/trusted-contacts")}
          >
            Emergency Contacts
          </button>

        </div>

      </section>


      {/* =========================
          LOGOUT MODAL
      ========================= */}

      {showLogoutConfirm && (

        <div className="logout-modal-overlay">

          <div className="logout-modal">

            <h3>
              Log Out?
            </h3>

            <p>
              Are you sure you want to logout?
            </p>

            <div className="logout-modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="confirm-logout-btn"
                onClick={() => {

                  localStorage.removeItem("token");
                  localStorage.removeItem("user");

                  navigate("/login");

                }}
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;