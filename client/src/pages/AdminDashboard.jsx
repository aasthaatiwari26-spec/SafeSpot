import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({ totalUsers: 0, totalAdmins: 0, totalIncidents: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [pendingReports, setPendingReports] = useState(0);

  // Fetch Dashboard Data from new Admin API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/dashboard-stats");
        const data = await response.json();
        
        if (response.ok && data.success) {
          setStats(data.stats);
          setRecentUsers(data.recentUsers || []);
          setRecentIncidents(data.recentReports || []);
          
          // Pending reports count calculate karne ke liye
          const pending = (data.recentReports || []).filter(
            (inc) => inc.status?.toLowerCase() === "pending"
          );
          setPendingReports(pending.length);
        }
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-dashboard-page">
        
        {/* HEADER */}
        <section className="admin-header">
          <div>
            <p className="admin-tag">ADMIN DASHBOARD</p>
            <h1>Welcome back, Admin</h1>
            <p>Monitor SafeSpot activity, manage reports, and keep the platform safe for everyone.</p>
          </div>
          <div className="admin-profile">
            <div className="admin-avatar">AD</div>
            <div>
              <strong>SafeSpot Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </section>

        {/* OVERVIEW CARDS */}
        <section className="admin-overview">
          <div className="admin-stat-card" onClick={() => navigate("/admin/users")}>
            <div className="admin-stat-icon">U</div>
            <div>
              <span>Total Users</span>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => navigate("/admin/incidents")}>
            <div className="admin-stat-icon">I</div>
            <div>
              <span>Total Incidents</span>
              <h2>{stats.totalIncidents}</h2>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => navigate("/admin/users")}>
            <div className="admin-stat-icon">A</div>
            <div>
              <span>Total Admins</span>
              <h2>{stats.totalAdmins}</h2>
            </div>
          </div>

          <div className="admin-stat-card" onClick={() => navigate("/admin/incidents")}>
            <div className="admin-stat-icon">P</div>
            <div>
              <span>Pending Reports</span>
              <h2>{pendingReports}</h2>
            </div>
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="admin-main">
          
          {/* INCIDENTS TABLE */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-section-tag">INCIDENT MONITORING</p>
                <h2>Recent Incidents</h2>
              </div>
              <button onClick={() => navigate("/admin/incidents")}>View All</button>
            </div>
            <div className="admin-table">
              <div className="admin-table-row admin-table-heading">
                <span>Incident</span>
                <span>Location</span>
                <span>Status</span>
              </div>
              {recentIncidents.length > 0 ? (
                recentIncidents.map((incident) => (
                  <div className="admin-table-row" key={incident._id}>
                    <span><strong>{incident.title || incident.category || "Report"}</strong></span>
                    <span>
                      {incident.location?.coordinates
                        ? `${incident.location.coordinates[1].toFixed(2)}, ${incident.location.coordinates[0].toFixed(2)}`
                        : "N/A"}
                    </span>
                    <span>
                      <span className={`status ${incident.status?.toLowerCase() || "pending"}`}>
                        {incident.status || "Pending"}
                      </span>
                    </span>
                  </div>
                ))
              ) : (
                <div className="admin-empty-state" style={{ padding: '20px 0', color: '#777' }}>No incidents reported yet.</div>
              )}
            </div>
          </div>

          {/* USERS TABLE */}
          <div className="admin-panel">
            <div className="admin-panel-header">
              <div>
                <p className="admin-section-tag">USER ACTIVITY</p>
                <h2>Recent Users</h2>
              </div>
              <button onClick={() => navigate("/admin/users")}>View All</button>
            </div>
            <div className="admin-users">
              {recentUsers.length > 0 ? (
                recentUsers.map((user) => (
                  <div className="admin-user" key={user._id}>
                    <div className="user-avatar">{user.name ? user.name.charAt(0).toUpperCase() : "U"}</div>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="admin-empty-state" style={{ padding: '20px 0', color: '#777' }}>No users registered yet.</div>
              )}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;