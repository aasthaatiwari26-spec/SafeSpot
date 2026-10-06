import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JourneyHistory.css";

function JourneyHistory() {
  const navigate = useNavigate();

  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // Fetch journey history
  useEffect(() => {
    const fetchJourneyHistory = async () => {

      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setError("Please login to view your journey history.");
        setLoading(false);
        return;
      }

      let user;

      try {
        user = JSON.parse(storedUser);
      } catch (error) {
        setError("Unable to identify your account. Please login again.");
        setLoading(false);
        return;
      }

      if (!user.id) {
        setError("User information is missing. Please login again.");
        setLoading(false);
        return;
      }

      try {

        const response = await fetch(
          `https://safespot-backend-ltud.onrender.com/api/journeys/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch journey history."
          );
        }

        setJourneys(data);

      } catch (error) {

        console.error(
          "Error fetching journey history:",
          error
        );

        setError(
          error.message || "Unable to load journey history."
        );

      } finally {

        setLoading(false);

      }
    };

    fetchJourneyHistory();

  }, []);


  // Delete journey
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journey?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `https://safespot-backend-ltud.onrender.com/api/journeys/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete journey."
        );
      }

      setJourneys((prev) =>
        prev.filter((journey) => journey._id !== id)
      );

    } catch (error) {

      console.error(
        "Error deleting journey:",
        error
      );

      alert(
        error.message || "Unable to delete journey."
      );

    }
  };


  // Format date
  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };


  // Format time
  const formatTime = (dateValue) => {

    if (!dateValue) {
      return "—";
    }

    const date = new Date(dateValue);

    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  return (
    <div className="history-page">

      {/* Hero */}
      <section className="history-hero">

        <div className="history-hero-content">

          <p className="history-tag">
            JOURNEY HISTORY
          </p>

          <h1>
            Keep Track of Your <span>Safe Journeys</span>
          </h1>

          <p>
            View your previous journeys and keep track of the
            routes you have planned through SafeSpot.
          </p>

        </div>

      </section>


      {/* Main */}
      <section className="history-section">

        <div className="history-container">

          <div className="history-intro">

            <p className="section-tag">
              YOUR JOURNEYS
            </p>

            <h2>
              Previous Journey Records
            </h2>

            <p>
              Your completed and planned journeys can be viewed
              here for easy reference.
            </p>

          </div>


          {/* Loading */}
          {loading && (
            <div className="empty-history">

              <h3>
                Loading journey history...
              </h3>

              <p>
                Please wait while we fetch your journeys.
              </p>

            </div>
          )}


          {/* Error */}
          {!loading && error && (
            <div className="empty-history">

              <h3>
                Unable to load journeys
              </h3>

              <p>
                {error}
              </p>

              <button
                onClick={() => navigate("/login")}
              >
                Go to Login
              </button>

            </div>
          )}


          {/* No journeys */}
          {!loading && !error && journeys.length === 0 && (
            <div className="empty-history">

              <h3>
                No journey records yet
              </h3>

              <p>
                Start a Safe Journey to see your journey
                records here.
              </p>

              <button
                onClick={() => navigate("/safe-journey")}
              >
                Start Safe Journey
              </button>

            </div>
          )}


          {/* Journey List */}
          {!loading && !error && journeys.length > 0 && (

            <div className="journey-list">

              {journeys.map((journey) => (

                <div
                  className="journey-card"
                  key={journey._id}
                >

                  <div className="journey-main">

                    <div className="journey-route">

                      {/* Starting Point */}
                      <div className="location-item">

                        <span className="location-dot"></span>

                        <div>

                          <small>
                            STARTING POINT
                          </small>

                          <h3>
                            {journey.start}
                          </h3>

                        </div>

                      </div>


                      <div className="route-line"></div>


                      {/* Destination */}
                      <div className="location-item">

                        <span className="location-dot destination-dot"></span>

                        <div>

                          <small>
                            DESTINATION
                          </small>

                          <h3>
                            {journey.destination}
                          </h3>

                        </div>

                      </div>

                    </div>


                    {/* Journey Information */}
                    <div className="journey-info">

                      <div>

                        <small>
                          DATE
                        </small>

                        <p>
                          {formatDate(journey.startedAt)}
                        </p>

                      </div>


                      <div>

                        <small>
                          TIME
                        </small>

                        <p>
                          {formatTime(journey.startedAt)}
                        </p>

                      </div>


                      <div>

                        <small>
                          STATUS
                        </small>

                        <span className="journey-status">
                          {journey.status}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Actions */}
                  <div className="journey-actions">

                    <button
                      className="view-journey-btn"
                      onClick={() =>
                        navigate("/safe-journey")
                      }
                    >
                      Plan Again
                    </button>


                    <button
                      className="delete-journey-btn"
                      onClick={() =>
                        handleDelete(journey._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* Information */}
      <section className="history-info-section">

        <div className="history-info">

          <div>

            <p className="section-tag">
              JOURNEY SAFETY
            </p>

            <h2>
              Plan smarter. Stay connected.
            </h2>

            <p>
              Before travelling, choose a suitable route, keep
              your phone charged and share your journey with
              someone you trust.
            </p>

          </div>


          <button
            onClick={() => navigate("/safe-journey")}
          >
            Start New Journey
          </button>

        </div>

      </section>


      {/* Note */}
      <section className="history-note-section">

        <div className="history-note">

          <h2>
            Journey Records
          </h2>

          <p>
            Your journey records are securely stored and
            retrieved from your SafeSpot account.
          </p>

        </div>

      </section>

    </div>
  );
}

export default JourneyHistory;