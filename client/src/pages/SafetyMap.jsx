import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// YAHAN CHANGE HAI: Socket.io client import kiya
import { io } from "socket.io-client"; 
import "./SafetyMap.css";

// Fix default marker icon issue with Leaflet + React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Colored pin icons based on status
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const statusIcons = {
  Pending: createIcon("orange"),
  Reviewed: createIcon("blue"),
  Resolved: createIcon("green"),
};

// Map ko udakar nayi location par le jane wala component
function FlyToMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

function SafetyMap() {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  
  // Map control states
  const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]); // Default Mumbai
  const [selectedSafety, setSelectedSafety] = useState("");

  const [incidents, setIncidents] = useState([]);
  const [incidentsLoading, setIncidentsLoading] = useState(true);

  // Fetch incidents from database
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/incidents");
        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }
        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        console.error("Error fetching incidents:", err);
      } finally {
        setIncidentsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // ==========================================
  // NAYA: SOCKET.IO LISTENER FOR REAL-TIME PINS
  // ==========================================
  useEffect(() => {
    // Backend se connect karo
    const socket = io("http://localhost:5000");

    // Jab naya report aaye, usko current state mein add kar do
    socket.on("newReport", (newIncident) => {
      console.log("🚨 Naya incident map par aaya:", newIncident);
      setIncidents((prevIncidents) => [newIncident, ...prevIncidents]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  // ==========================================

  // Hardcoded areas for the cards
  const safetyAreas = {
    safe: [
      { name: "Andheri West", rating: "4.2", reviews: 82 },
      { name: "Malad West", rating: "4.0", reviews: 65 },
      { name: "Borivali West", rating: "4.1", reviews: 57 },
    ],
    moderate: [
      { name: "Panvel Market", rating: "3.4", reviews: 41 },
      { name: "Andheri East", rating: "3.5", reviews: 53 },
      { name: "Malad East", rating: "3.3", reviews: 38 },
    ],
    attention: [],
  };

  // Smart Search using OpenStreetMap API
  const handleSearch = async () => {
    if (!location.trim()) {
      setError("Please enter an area or location to search.");
      return;
    }
    setError("");

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        
        // Map ka center change karo
        setMapCenter([lat, lng]);
      } else {
        setError("Area not found. Try a broader area name.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search location.");
    }
  };

  const renderAreas = (type) => {
    return safetyAreas[type].map((area, index) => (
      <div className="safety-area-card" key={index}>
        <div>
          <h4>{area.name}</h4>
          <p>⭐ {area.rating}/5</p>
        </div>
        <span>{area.reviews} community reviews</span>
      </div>
    ));
  };

  return (
    <div className="safety-map-page">

      <div className="map-header">
        <p className="map-tag">SAFETY MAP</p>
        <h1>Explore Area Safety</h1>
        <p>Check safety information and reported incidents before you travel.</p>
      </div>

      <div className="map-search" style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search an area or location..."
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button 
          type="button" 
          onClick={handleSearch}
          style={{ padding: "10px 20px", backgroundColor: "#7c3aed", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
        >
          Search
        </button>
      </div>

      {error && <div className="map-error" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <div className="map-container">
        <div style={{ height: "450px", borderRadius: "18px", overflow: "hidden", border: "2px solid #e5e7eb" }}>
          <MapContainer
            center={mapCenter}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="OpenStreetMap contributors"
            />
            
            {/* Map ko center par udane wala component */}
            <FlyToMap center={mapCenter} />

            {!incidentsLoading &&
              incidents.map((incident) => (
                incident.latitude && incident.longitude && (
                  <Marker
                    key={incident._id}
                    position={[incident.latitude, incident.longitude]}
                    icon={statusIcons[incident.status] || statusIcons.Pending}
                  >
                    <Popup>
                      <strong>{incident.incidentType}</strong>
                      <br />
                      {incident.location}
                      <br />
                      {new Date(incident.date).toLocaleDateString()}
                      <br />
                      Status: {incident.status}
                      <br />
                      <span style={{ fontSize: "12px" }}>
                        {incident.description}
                      </span>
                    </Popup>
                  </Marker>
                )
              ))}
          </MapContainer>
        </div>
      </div>

      {/* LEGEND AUR CARDS CODE */}
      <div className="safety-legend" style={{ marginTop: "20px" }}>
        <button type="button" className="legend-item" onClick={() => setSelectedSafety("safe")}>
          <span className="safe-dot"></span>
          <div>
            <strong>Generally Safe</strong>
            <p>Higher positive community ratings</p>
          </div>
        </button>

        <button type="button" className="legend-item" onClick={() => setSelectedSafety("moderate")}>
          <span className="moderate-dot"></span>
          <div>
            <strong>Mixed / Moderate</strong>
            <p>Mixed community experiences</p>
          </div>
        </button>

        <button type="button" className="legend-item" onClick={() => setSelectedSafety("attention")}>
          <span className="unsafe-dot"></span>
          <div>
            <strong>Needs Attention</strong>
            <p>More safety concerns in reviews</p>
          </div>
        </button>
      </div>

      {selectedSafety && (
        <div className="safety-results">

          {selectedSafety === "safe" && (
            <>
              <h2>🟢 Generally Safe Areas</h2>
              <p className="results-description">
                Areas receiving comparatively positive safety ratings from the SafeSpot community.
              </p>
              <div className="safety-area-list">{renderAreas("safe")}</div>
            </>
          )}

          {selectedSafety === "moderate" && (
            <>
              <h2>🟡 Mixed / Moderate Areas</h2>
              <p className="results-description">
                Areas where community experiences and safety ratings are mixed.
              </p>
              <div className="safety-area-list">{renderAreas("moderate")}</div>
            </>
          )}

          {selectedSafety === "attention" && (
            <>
              <h2>🔴 Areas Needing Attention</h2>
              <p className="results-description">
                Areas where community reviews mention more safety concerns.
              </p>
              <div className="safety-area-list">
                {safetyAreas.attention.length === 0 ? (
                  <div className="no-reviewed-areas">
                    <h4>No reviewed areas yet</h4>
                    <p>No areas have received enough community reviews to be listed here.</p>
                  </div>
                ) : (
                  renderAreas("attention")
                )}
              </div>
            </>
          )}

          <p className="safety-disclaimer">
            Safety ratings are based on community reviews and may vary depending on time, route and individual experience.
          </p>

        </div>
      )}

    </div>
  );
}

export default SafetyMap;