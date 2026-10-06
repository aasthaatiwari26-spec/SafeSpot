import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SafeJourney.css";

function SafeJourney() {
  const navigate = useNavigate();

  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [contact, setContact] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [journeyStarted, setJourneyStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartJourney = async () => {

    // Basic validation
    if (!start.trim() || !destination.trim()) {
      setError("Please enter both starting point and destination.");
      setSuccess("");
      setJourneyStarted(false);
      return;
    }

    // Get logged-in user
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("Please login to start a journey.");
      setSuccess("");
      setJourneyStarted(false);
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      setError("Unable to identify your account. Please login again.");
      setSuccess("");
      setJourneyStarted(false);
      return;
    }

    if (!user.id) {
      setError("User information is missing. Please login again.");
      setSuccess("");
      setJourneyStarted(false);
      return;
    }

    try {

      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "http://https://safespot-backend-ltud.onrender.com/api/journeys",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user.id,
            start: start.trim(),
            destination: destination.trim(),
            contact: contact.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to start journey."
        );
      }

      setJourneyStarted(true);

      setSuccess("Journey started successfully.");

    } catch (error) {

      console.error("Error starting journey:", error);

      setJourneyStarted(false);

      setError(
        error.message || "Unable to start journey."
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="journey-page">

      {/* HEADER */}
      <div className="journey-header">

        <p className="journey-tag">
          SAFE JOURNEY
        </p>

        <h1>
          Plan Your Safe Journey
        </h1>

        <p>
          Plan your route and stay connected with someone you trust.
        </p>

      </div>


      {/* JOURNEY FORM */}
      <div className="journey-container">

        <div className="journey-form-card">

          <h2>
            Journey Details
          </h2>

          <div className="journey-form">

            {/* STARTING POINT */}
            <div className="journey-field">

              <label>
                Starting Point
              </label>

              <input
                type="text"
                placeholder="Enter starting location"
                value={start}
                onChange={(e) => {
                  setStart(e.target.value);
                  setError("");
                  setSuccess("");
                  setJourneyStarted(false);
                }}
              />

            </div>


            {/* DESTINATION */}
            <div className="journey-field">

              <label>
                Destination
              </label>

              <input
                type="text"
                placeholder="Enter destination"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setError("");
                  setSuccess("");
                  setJourneyStarted(false);
                }}
              />

            </div>


            {/* TRUSTED CONTACT */}
            <div className="journey-field">

              <label>
                Trusted Contact (Optional)
              </label>

              <input
                type="text"
                placeholder="Enter contact name"
                value={contact}
                onChange={(e) => {
                  setContact(e.target.value);
                  setError("");
                  setSuccess("");
                }}
              />

            </div>


            {/* START JOURNEY BUTTON */}
            <button
              className="journey-button"
              type="button"
              onClick={handleStartJourney}
              disabled={loading}
            >
              {loading
                ? "Starting Journey..."
                : "Start Safe Journey"}
            </button>


            {/* ERROR */}
            {error && (
              <div className="journey-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}
            {success && (
              <div className="journey-success">
                {success}
              </div>
            )}

          </div>

        </div>

      </div>


      {/* STAY CONNECTED */}
      <div className="journey-info-card">

        <div className="journey-info-header">

          <h2>
            Stay Connected
          </h2>

          <p>
            Use these safety features while planning and during your journey.
          </p>

        </div>


        <div className="journey-features">

          {/* LIVE JOURNEY SHARING */}
          <button
            className="journey-feature"
            type="button"
            onClick={() => navigate("/trusted-contacts")}
          >

            <strong>
              Live Journey Sharing
            </strong>

            <p>
              Keep your trusted contact informed about your journey.
            </p>

            <span>
              Manage Trusted Contacts →
            </span>

          </button>


          {/* ROUTE SAFETY */}
          <button
            className="journey-feature"
            type="button"
            onClick={() => navigate("/safety-map")}
          >

            <strong>
              Route Safety
            </strong>

            <p>
              Check safety information along your planned route.
            </p>

            <span>
              Check Safety Map →
            </span>

          </button>


          {/* EMERGENCY SUPPORT */}
          <button
            className="journey-feature"
            type="button"
            onClick={() => navigate("/emergency")}
          >

            <strong>
              Emergency Support
            </strong>

            <p>
              Get quick access to emergency assistance when needed.
            </p>

            <span>
              Open Emergency Center →
            </span>

          </button>

        </div>

      </div>


      {/* JOURNEY STATUS */}
      <div className="journey-status">

        <h2>
          {journeyStarted
            ? "Journey Active"
            : "No Active Journey"}
        </h2>

        <p>
          {journeyStarted
            ? `Journey from ${start} to ${destination} has been started.`
            : "Once you start a journey, its status and details will appear here."}
        </p>

      </div>

    </div>
  );
}

export default SafeJourney;