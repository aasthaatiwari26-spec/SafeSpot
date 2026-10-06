import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Emergency.css";

function Emergency() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [loading, setLoading] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState([]);

  const token = localStorage.getItem("token");

  // ==========================================
  // FETCH TRUSTED CONTACTS FROM MONGODB
  // ==========================================
  useEffect(() => {
    fetchTrustedContacts();
  }, []); 

  const fetchTrustedContacts = async () => {
    try {
      const response = await fetch(
        "http://https://safespot-backend-ltud.onrender.com/api/trusted-contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTrustedContacts(data);
      } else {
        console.error("Failed to fetch trusted contacts.");
      }
    } catch (error) {
      console.error("Error fetching trusted contacts:", error);
    }
  };

  // ==========================================
  // SOS / WHATSAPP LOCATION SHARING
  // ==========================================
  const handleShareLocation = () => {
    setLocationError("");
    setLoading(true);

    if (!navigator.geolocation) {
      setLoading(false);
      setLocationError("Location services are not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const locString = `Latitude: ${latitude.toFixed(5)}, Longitude: ${longitude.toFixed(5)}`;
        setLocation(locString);
        setLoading(false);

        // Google Maps live location link
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
        const message = encodeURIComponent(
          `🚨 EMERGENCY! I need help. My current live location is: ${mapsUrl}`
        );

        // Check if trusted contacts are available
        if (trustedContacts.length > 0) {
          // Pehle trusted contact ka phone number lete hain (field name 'phone' ya 'phoneNumber' ho sakta hai)
          const contactPhone = trustedContacts[0].phone || trustedContacts[0].phoneNumber;

          if (contactPhone) {
            const cleanedNumber = contactPhone.replace(/[^0-9]/g, "");
            const whatsappUrl = `https://wa.me/${cleanedNumber}?text=${message}`;
            window.open(whatsappUrl, "_blank");
          } else {
            alert("Trusted contact phone number is missing!");
          }
        } else {
          alert("No trusted contacts found! Please add a trusted contact first.");
          navigate("/trusted-contacts");
        }
      },
      (error) => {
        setLoading(false);
        if (error.code === 1) {
          setLocationError("Location permission was denied. Please allow location access.");
        } else if (error.code === 2) {
          setLocationError("Your location could not be determined. Please try again.");
        } else if (error.code === 3) {
          setLocationError("Location request timed out. Please try again.");
        } else {
          setLocationError("Unable to access your location. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="emergency-page">

      <div className="emergency-header">
        <p className="emergency-tag">EMERGENCY CENTER</p>
        <h1>Get Help When You Need It</h1>
        <p>Access emergency services and your trusted contacts quickly.</p>
      </div>

      {/* ==========================================
          SOS SECTION
      ========================================== */}
      <div className="sos-section">
        <div className="sos-content">
          <p className="sos-label">EMERGENCY SOS</p>
          <h2>Need immediate help?</h2>
          <p>
            Use the SOS button to instantly open WhatsApp with your live location and alert your trusted contacts.
          </p>

          <button
            className="sos-button"
            onClick={handleShareLocation}
            disabled={loading}
          >
            {loading ? "Detecting Location..." : "SOS"}
          </button>

          <small>Press only when you need emergency assistance.</small>
        </div>
      </div>

      {/* ==========================================
          EMERGENCY SERVICES
      ========================================== */}
      <section className="emergency-services">
        <h2>Emergency Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <div className="service-icon">112</div>
            <h3>National Emergency (112)</h3>
            <p>For immediate emergency assistance.</p>
            <button onClick={() => (window.location.href = "tel:112")}>
              Call 112
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">P</div>
            <h3>Police</h3>
            <p>Contact police services during an emergency.</p>
            <button onClick={() => (window.location.href = "tel:100")}>
              Contact Police
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">M</div>
            <h3>Ambulance</h3>
            <p>Request medical emergency assistance.</p>
            <button onClick={() => (window.location.href = "tel:108")}>
              Call Ambulance
            </button>
          </div>

          <div className="service-card">
            <div className="service-icon">W</div>
            <h3>Women Helpline</h3>
            <p>Access support and assistance for women.</p>
            <button onClick={() => (window.location.href = "tel:1091")}>
              Call Helpline
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          TRUSTED CONTACTS
      ========================================== */}
      <section className="trusted-section">
        <div>
          <h2>Trusted Contacts</h2>
          <p>Add people you trust so they can be contacted quickly during an emergency.</p>
          {trustedContacts.length > 0 && (
            <p>
              {trustedContacts.length} trusted contact{trustedContacts.length > 1 ? "s" : ""} available for SOS.
            </p>
          )}
        </div>

        <button
          className="add-contact-button"
          type="button"
          onClick={() => navigate("/trusted-contacts")}
        >
          Add Trusted Contact
        </button>
      </section>

      {/* ==========================================
          LOCATION SHARING STATUS
      ========================================== */}
      <section className="location-section">
        <div>
          <h2>Location Sharing</h2>
          <p>Your location-sharing feature will allow trusted contacts to follow your journey during an emergency.</p>

          {location && (
            <p className="location-success">📍 Location detected: {location}</p>
          )}

          {locationError && (
            <p className="location-error">{locationError}</p>
          )}
        </div>

        <button
          className="location-button"
          type="button"
          onClick={handleShareLocation}
          disabled={loading}
        >
          {loading ? "Processing..." : "Share My Location"}
        </button>
      </section>

    </div>
  );
}

export default Emergency;