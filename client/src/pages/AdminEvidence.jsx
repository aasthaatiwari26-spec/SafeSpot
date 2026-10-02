import React from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminEvidence.css";

function AdminEvidence() {
  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-evidence-page">

        {/* HEADER */}
        <section className="admin-evidence-header">

          <div>
            <p className="admin-tag">EVIDENCE MODERATION</p>

            <h1>Evidence</h1>

            <p>
              Review and manage evidence submitted with safety
              incident reports.
            </p>
          </div>

        </section>


        {/* EVIDENCE PANEL */}
        <section className="evidence-management-panel">

          <div className="evidence-panel-top">

            <div>
              <h2>Submitted Evidence</h2>

              <p>
                Photos, videos, and other evidence submitted by users
                will appear here.
              </p>
            </div>

            <div className="evidence-count">
              <span>Total Evidence</span>
              <strong>0</strong>
            </div>

          </div>


          {/* FILTERS */}
          <div className="evidence-filters">

            <input
              type="text"
              placeholder="Search evidence..."
            />

            <select defaultValue="all">
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="document">Documents</option>
            </select>

          </div>


          {/* EVIDENCE TABLE */}
          <div className="evidence-table">

            <div className="evidence-table-row evidence-table-heading">
              <span>Evidence</span>
              <span>Incident</span>
              <span>Type</span>
              <span>Status</span>
              <span>Action</span>
            </div>


            {/* EMPTY STATE */}
            <div className="evidence-empty-state">

              <div className="evidence-empty-icon">
                E
              </div>

              <h3>No evidence submitted yet</h3>

              <p>
                Evidence submitted by users will appear here once
                it is attached to a safety incident.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminEvidence;