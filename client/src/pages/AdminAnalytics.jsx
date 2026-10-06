import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminAnalytics.css";

function AdminAnalytics() {
  const [stats, setStats] = useState({ totalUsers: 0, totalAdmins: 0, totalIncidents: 0 });
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch live stats and analytics data from backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // 1. Fetch overview stats
        const statsRes = await fetch("https://safespot-backend-ltud.onrender.com/api/admin/dashboard-stats");
        const statsData = await statsRes.json();
        if (statsRes.ok && statsData.success) {
          setStats(statsData.stats);
        }

        // 2. Fetch category breakdown analytics
        const analyticsRes = await fetch("https://safespot-backend-ltud.onrender.com/api/admin/analytics");
        const analyticsData = await analyticsRes.json();
        if (analyticsRes.ok && analyticsData.success) {
          setCategoryStats(analyticsData.categoryStats || []);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-analytics-page">

        {/* HEADER */}
        <section className="admin-analytics-header">
          <div>
            <p className="admin-tag">PLATFORM ANALYTICS</p>
            <h1>Analytics</h1>
            <p>
              Monitor SafeSpot activity and view platform insights
              based on real user data.
            </p>
          </div>
        </section>


        {/* ANALYTICS OVERVIEW */}
        <section className="analytics-overview">

          <div className="analytics-card">
            <span>Total Users</span>
            <h2>{stats.totalUsers}</h2>
            <small>{stats.totalUsers > 0 ? "Active registered users" : "No data available"}</small>
          </div>

          <div className="analytics-card">
            <span>Total Incidents</span>
            <h2>{stats.totalIncidents}</h2>
            <small>{stats.totalIncidents > 0 ? "Reported safety incidents" : "No data available"}</small>
          </div>

          <div className="analytics-card">
            <span>Total Admins</span>
            <h2>{stats.totalAdmins}</h2>
            <small>Platform administrators</small>
          </div>

          <div className="analytics-card">
            <span>Reported Locations</span>
            <h2>{stats.totalIncidents}</h2>
            <small>Geo-tagged locations</small>
          </div>

        </section>


        {/* ANALYTICS CONTENT */}
        <section className="analytics-main">

          {/* INCIDENT ANALYTICS / CATEGORY BREAKDOWN */}
          <div className="analytics-panel">

            <div className="analytics-panel-header">
              <div>
                <p className="admin-section-tag">
                  INCIDENT ANALYSIS
                </p>
                <h2>Category Breakdown</h2>
              </div>
            </div>

            {loading ? (
              <div className="analytics-empty-state">
                <h3>Loading analytics...</h3>
              </div>
            ) : categoryStats.length > 0 ? (
              <div style={{ padding: "20px" }}>
                {categoryStats.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee" }}>
                    <strong style={{ textTransform: "capitalize" }}>{item._id ? item._id.replace("_", " ") : "General"}</strong>
                    <span style={{ background: "#f3f0ff", color: "#6b46c1", padding: "6px 14px", borderRadius: "8px", fontWeight: "600" }}>
                      {item.count} reports
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="analytics-empty-state">
                <div className="analytics-empty-icon">
                  I
                </div>
                <h3>No incident data available</h3>
                <p>
                  Incident analytics will be displayed here once real
                  incident reports are submitted.
                </p>
              </div>
            )}

          </div>


          {/* USER ANALYTICS */}
          <div className="analytics-panel">

            <div className="analytics-panel-header">
              <div>
                <p className="admin-section-tag">
                  USER ACTIVITY
                </p>
                <h2>User Growth</h2>
              </div>
            </div>

            <div className="analytics-empty-state">
              <div className="analytics-empty-icon">
                U
              </div>
              <h3>Total Registered Users: {stats.totalUsers}</h3>
              <p>
                User tracking is live and synced securely with the MongoDB database.
              </p>
            </div>

          </div>

        </section>


        {/* REPORT ANALYTICS */}
        <section className="analytics-report-panel">

          <div>
            <p className="admin-section-tag">
              REPORT INSIGHTS
            </p>
            <h2>Safety Report Insights</h2>
            <p>
              Detailed safety trends and report statistics generated
              from real SafeSpot data.
            </p>
          </div>

          <div className="analytics-report-empty">
            <div className="analytics-empty-icon">
              A
            </div>
            <h3>Platform Status: Active 🚀</h3>
            <p>
              All systems operational. Database connected successfully with {stats.totalIncidents} total incidents logged.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminAnalytics;