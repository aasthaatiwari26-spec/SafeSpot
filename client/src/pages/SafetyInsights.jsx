import React from "react";
import { useNavigate } from "react-router-dom";
import "./SafetyInsights.css";

function SafetyInsights() {
  const navigate = useNavigate();

  return (
    <div className="insights-page">

      {/* Hero Section */}
      <section className="insights-hero">
        <div className="insights-hero-content">
          <p className="insights-tag">SAFETY INSIGHTS</p>

          <h1>
            Understand Safety Through <span>Community Data</span>
          </h1>

          <p>
            Explore simple safety insights based on community reports,
            reviews and common safety concerns.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="insights-section">
        <div className="insights-container">

          <div className="insights-intro">
            <p className="section-tag">OVERVIEW</p>

            <h2>Community Safety Snapshot</h2>

            <p>
              These insights provide an overview of reported safety
              experiences. They are intended for awareness and should
              not be treated as official safety ratings.
            </p>
          </div>

          {/* Statistics */}
          <div className="insights-stats">

            <div className="insight-stat-card">
              <div className="stat-number">12</div>
              <h3>Community Reports</h3>
              <p>
                Safety concerns shared by community members.
              </p>
            </div>

            <div className="insight-stat-card">
              <div className="stat-number">8</div>
              <h3>Reviewed Areas</h3>
              <p>
                Areas with available community experiences.
              </p>
            </div>

            <div className="insight-stat-card">
              <div className="stat-number">4.0</div>
              <h3>Average Rating</h3>
              <p>
                Average community rating across reviewed areas.
              </p>
            </div>

            <div className="insight-stat-card">
              <div className="stat-number">5</div>
              <h3>Safety Categories</h3>
              <p>
                Different types of safety concerns tracked.
              </p>
            </div>

          </div>

          {/* Common Concerns */}
          <div className="concerns-section">

            <div className="section-heading">
              <p className="section-tag">COMMON CONCERNS</p>

              <h2>What Communities Are Reporting</h2>

              <p>
                Common themes identified from community safety reports.
              </p>
            </div>

            <div className="concerns-grid">

              <div className="concern-card">
                <div className="concern-number">01</div>

                <h3>Street Lighting</h3>

                <p>
                  Reports may highlight poorly lit streets or areas
                  where visibility is limited after evening hours.
                </p>
              </div>

              <div className="concern-card">
                <div className="concern-number">02</div>

                <h3>Crowded Areas</h3>

                <p>
                  Community members may report heavy crowding around
                  stations, markets and public places.
                </p>
              </div>

              <div className="concern-card">
                <div className="concern-number">03</div>

                <h3>Isolated Routes</h3>

                <p>
                  Less crowded routes may receive safety concerns,
                  especially during late hours.
                </p>
              </div>

            </div>
          </div>

          {/* Safety Tips */}
          <div className="insights-tips">

            <div className="tips-content">
              <p className="section-tag">USE INSIGHTS WISELY</p>

              <h2>Turn Information Into Safer Decisions</h2>

              <p>
                Community insights can help you become more aware of
                your surroundings and make informed travel decisions.
              </p>

              <div className="tips-list">

                <div className="tip-item">
                  <span>01</span>
                  <div>
                    <h3>Check Before You Travel</h3>
                    <p>
                      Review community information before travelling
                      through an unfamiliar area.
                    </p>
                  </div>
                </div>

                <div className="tip-item">
                  <span>02</span>
                  <div>
                    <h3>Consider Time and Route</h3>
                    <p>
                      Safety conditions can change depending on the
                      time, route and surrounding activity.
                    </p>
                  </div>
                </div>

                <div className="tip-item">
                  <span>03</span>
                  <div>
                    <h3>Use Your Own Judgment</h3>
                    <p>
                      Community information is useful for awareness,
                      but your personal judgment should always come first.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Explore Tools */}
      <section className="insights-tools">

        <div className="insights-tools-content">

          <div>
            <p className="section-tag">EXPLORE SAFESPOT</p>

            <h2>Want More Safety Information?</h2>

            <p>
              Explore community reports and safety reviews to learn
              more about experiences shared by other users.
            </p>
          </div>

          <div className="insights-buttons">

            <button
              onClick={() => navigate("/community-reports")}
            >
              Community Reports
            </button>

            <button
              onClick={() => navigate("/reviews")}
            >
              Safety Reviews
            </button>

            <button
              onClick={() => navigate("/safety-map")}
            >
              Safety Map
            </button>

          </div>

        </div>

      </section>

      {/* Note */}
      <section className="insights-note-section">

        <div className="insights-note">

          <h2>Important Safety Note</h2>

          <p>
            Safety Insights are based on community information and
            sample data in this frontend prototype. They do not
            represent official crime statistics or guaranteed safety
            conditions. Always consider current conditions and your
            own judgment.
          </p>

        </div>

      </section>

    </div>
  );
}

export default SafetyInsights;