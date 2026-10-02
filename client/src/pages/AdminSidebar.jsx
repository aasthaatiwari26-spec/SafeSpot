import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminSidebar.css";

function AdminSidebar() {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    setShowLogoutPopup(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <>
      <aside className="admin-sidebar">

        <div className="admin-sidebar-logo">
          <h2>SafeSpot</h2>
          <span>ADMIN PANEL</span>
        </div>

        <nav className="admin-sidebar-nav">

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">D</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">U</span>
            <span>User Management</span>
          </NavLink>

          <NavLink
            to="/admin/incidents"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">I</span>
            <span>Incident Management</span>
          </NavLink>

          <NavLink
            to="/admin/evidence"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">E</span>
            <span>Evidence Moderation</span>
          </NavLink>

          <NavLink
            to="/admin/locations"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">L</span>
            <span>Location Management</span>
          </NavLink>

          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active" : "admin-nav-link"
            }
          >
            <span className="admin-nav-icon">A</span>
            <span>Analytics</span>
          </NavLink>

        </nav>

        <div className="admin-sidebar-bottom">
          <button
            type="button"
            className="admin-logout-button"
            onClick={handleLogout}
          >
            <span className="admin-nav-icon">↪</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {showLogoutPopup && (
        <div className="logout-popup-overlay">

          <div className="logout-popup">

            <div className="logout-popup-icon">
              ↪
            </div>

            <h3>Are you sure you want to logout?</h3>

            <p>
              You will be redirected to the login page.
            </p>

            <div className="logout-popup-buttons">

              <button
                type="button"
                className="logout-cancel-button"
                onClick={cancelLogout}
              >
                Cancel
              </button>

              <button
                type="button"
                className="logout-confirm-button"
                onClick={confirmLogout}
              >
                Logout
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default AdminSidebar;
