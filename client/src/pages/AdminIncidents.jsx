import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./AdminIncidents.css";

function AdminIncidents() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch incidents from Admin API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/incidents");

        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data = await response.json();
        setIncidents(data.reports || []);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/incidents/${selectedIncident._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();

      // Update the popup's incident data
      setSelectedIncident(data.incident);

      // Update the incident in the main list too
      setIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident._id === data.incident._id ? data.incident : incident
        )
      );

    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Search + status filter
  const filteredIncidents = incidents.filter((incident) => {
    const titleText = incident.title || incident.category || incident.incidentType || "";
    const descText = incident.description || "";
    const searchText = `${titleText} ${descText}`.toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const incidentStatus = incident.status ? incident.status.toLowerCase() : "pending";
    const matchesStatus =
      statusFilter === "all" || incidentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <main className="admin-incidents-page">

        {/* HEADER */}
        <section className="admin-incidents-header">
          <div>
            <p className="admin-tag">INCIDENT MANAGEMENT</p>
            <h1>Incidents</h1>
            <p>Review, monitor, and manage safety incidents reported through SafeSpot.</p>
          </div>
        </section>

        {/* INCIDENT MANAGEMENT PANEL */}
        <section className="incidents-management-panel">

          <div className="incidents-panel-top">
            <div>
              <h2>Reported Incidents</h2>
              <p>All safety incidents submitted by SafeSpot users will appear here.</p>
            </div>

            <div className="incidents-count">
              <span>Total Incidents</span>
              <strong>{incidents.length}</strong>
            </div>
          </div>

          {/* FILTERS */}
          <div className="incidents-filters">
            <input
              type="text"
              placeholder="Search incidents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* INCIDENT TABLE */}
          <div className="incidents-table">

            <div className="incidents-table-row incidents-table-heading">
              <span>Incident</span>
              <span>Category</span>
              <span>Date</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="incidents-empty-state">
                <h3>Loading incidents...</h3>
                <p>Please wait while incident data is being loaded.</p>
              </div>
            )}

            {/* INCIDENTS */}
            {!loading && filteredIncidents.length > 0 && (
              filteredIncidents.map((incident) => (
                <div className="incidents-table-row" key={incident._id}>
                  <span>
                    <strong>{incident.title || incident.category || "Report"}</strong>
                  </span>
                  <span>
                    {incident.category || "General"}
                  </span>
                  <span>
                    {new Date(incident.createdAt || incident.date).toLocaleDateString()}
                  </span>
                  <span>
                    <span className="incident-status" style={{ textTransform: "capitalize" }}>
                      {incident.status || "Pending"}
                    </span>
                  </span>
                  <span>
                    <button
                      className="incident-action-button"
                      onClick={() => setSelectedIncident(incident)}
                    >
                      View
                    </button>
                  </span>
                </div>
              ))
            )}

            {/* NO SEARCH RESULTS */}
            {!loading && incidents.length > 0 && filteredIncidents.length === 0 && (
              <div className="incidents-empty-state">
                <div className="incidents-empty-icon">I</div>
                <h3>No incidents found</h3>
                <p>No incident matches your search or selected filter.</p>
              </div>
            )}

            {/* NO INCIDENTS */}
            {!loading && incidents.length === 0 && (
              <div className="incidents-empty-state">
                <div className="incidents-empty-icon">I</div>
                <h3>No incidents reported yet</h3>
                <p>Safety incidents submitted by users will appear here once they are reported.</p>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* INCIDENT DETAILS POPUP */}
      {selectedIncident && (
        <div className="incident-popup-overlay">
          <div className="incident-popup">

            <div className="incident-popup-header">
              <div>
                <p className="admin-tag">INCIDENT DETAILS</p>
                <h2>{selectedIncident.title || selectedIncident.category || "Report"}</h2>
              </div>
              <button
                className="incident-popup-close"
                onClick={() => setSelectedIncident(null)}
              >
                ×
              </button>
            </div>

            <div className="incident-popup-details">

              <div className="incident-detail-item">
                <span>Category</span>
                <strong>{selectedIncident.category || "N/A"}</strong>
              </div>

              <div className="incident-detail-item">
                <span>Status</span>
                <select
                  className="incident-status-select"
                  value={selectedIncident.status || "Pending"}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={updatingStatus}
                >
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="incident-detail-item full-width">
                <span>Description</span>
                <p>{selectedIncident.description || "No description provided."}</p>
              </div>

              <div className="incident-detail-item full-width">
                <span>Reported On</span>
                <strong>
                  {new Date(selectedIncident.createdAt || selectedIncident.date).toLocaleString()}
                </strong>
              </div>

            </div>

            <div className="incident-popup-footer">
              <button
                className="incident-popup-close-button"
                onClick={() => setSelectedIncident(null)}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminIncidents;