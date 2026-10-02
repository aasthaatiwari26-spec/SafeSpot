import React from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminLocations.css";

function AdminLocations() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-locations-page">

        {/* HEADER */}
        <section className="admin-locations-header">

          <div>
            <p className="admin-tag">LOCATION MANAGEMENT</p>

            <h1>Locations</h1>

            <p>
              Manage safety locations and location-based reports
              submitted through SafeSpot.
            </p>
          </div>

        </section>


        {/* LOCATION MANAGEMENT PANEL */}
        <section className="locations-management-panel">

          <div className="locations-panel-top">

            <div>
              <h2>Reported Locations</h2>

              <p>
                Safety locations reported by SafeSpot users will
                appear here.
              </p>
            </div>

            <div className="locations-count">
              <span>Total Locations</span>
              <strong>0</strong>
            </div>

          </div>


          {/* SEARCH AND FILTER */}
          <div className="locations-filters">

            <input
              type="text"
              placeholder="Search locations..."
            />

            <select defaultValue="all">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>

          </div>


          {/* LOCATION TABLE */}
          <div className="locations-table">

            <div className="locations-table-row locations-table-heading">
              <span>Location</span>
              <span>Reports</span>
              <span>Status</span>
              <span>Last Reported</span>
              <span>Action</span>
            </div>


            {/* EMPTY STATE */}
            <div className="locations-empty-state">

              <div className="locations-empty-icon">
                L
              </div>

              <h3>No locations reported yet</h3>

              <p>
                Safety locations submitted by users will appear here
                once location reports are available.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminLocations;