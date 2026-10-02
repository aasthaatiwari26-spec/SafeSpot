import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  /* =========================
     CHECK LOGIN
  ========================= */

  const handleProtectedFeature = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(path);
  };


  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <p className="tagline">
            🛡️ YOUR SAFETY, OUR PRIORITY
          </p>

          <h1>
            Stay Alert.
            <br />
            Stay <span>Safe.</span>
          </h1>

          <p className="hero-text">
            SafeSpot helps you discover safer places, plan safer journeys,
            stay connected with your trusted contacts, and get help when you
            need it.
          </p>

          <div className="hero-buttons">

            <button
              onClick={() =>
                handleProtectedFeature("/safety-map")
              }
            >
              Check Area Safety
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                handleProtectedFeature("/safe-journey")
              }
            >
              Start Safe Journey
            </button>

          </div>

        </div>


        <div className="hero-card">

          <div className="shield">
            🛡️
          </div>

          <h3>
            SafeSpot
          </h3>

          <p>
            Know before you go.
          </p>

          <div className="hero-card-status">

            <span className="status-dot"></span>

            You're protected

          </div>

        </div>

      </section>


      {/* Stats Strip */}
      <section className="stats-strip">

        <div className="stat-item">
          <h3>24/7</h3>
          <p>Emergency Access</p>
        </div>

        <div className="stat-item">
          <h3>5+</h3>
          <p>Trusted Contacts</p>
        </div>

        <div className="stat-item">
          <h3>100%</h3>
          <p>Private &amp; Secure</p>
        </div>

        <div className="stat-item">
          <h3>1-Tap</h3>
          <p>SOS Alert</p>
        </div>

      </section>


      {/* Features */}
      <section className="features">

        <p className="section-tag">
          WHAT SAFESPOT OFFERS
        </p>

        <h2>
          Everything you need to feel safer.
        </h2>


        <div className="feature-grid">

          {/* Safety Map */}
          <div
            className="feature-card"
            onClick={() =>
              handleProtectedFeature("/safety-map")
            }
          >

            <h3>
              Safety Map
            </h3>

            <p>
              Check the safety level of an area before visiting it.
            </p>

            <span className="feature-link">
              Explore map →
            </span>

          </div>


          {/* Safe Journey */}
          <div
            className="feature-card"
            onClick={() =>
              handleProtectedFeature("/safe-journey")
            }
          >

            <h3>
              Safe Journey
            </h3>

            <p>
              Plan your journey and stay connected with your safety buddy.
            </p>

            <span className="feature-link">
              Plan a trip →
            </span>

          </div>


          {/* Emergency SOS */}
          <div
            className="feature-card"
            onClick={() =>
              handleProtectedFeature("/emergency")
            }
          >

            <h3>
              Emergency SOS
            </h3>

            <p>
              Quickly access emergency help and trusted contacts.
            </p>

            <span className="feature-link">
              Open emergency center →
            </span>

          </div>


          {/* Report Incident */}
          <div
            className="feature-card"
            onClick={() =>
              handleProtectedFeature("/report-incident")
            }
          >

            <h3>
              Report an Incident
            </h3>

            <p>
              Report unsafe situations and help improve community safety.
            </p>

            <span className="feature-link">
              Report now →
            </span>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="how-it-works">

        <p className="section-tag">
          HOW IT WORKS
        </p>

        <h2>
          Four steps to feeling safer.
        </h2>


        <div className="steps-grid">

          <div className="step-card">

            <div className="step-number">
              01
            </div>

            <h3>
              Create your account
            </h3>

            <p>
              Sign up in seconds and add the trusted contacts who should
              be alerted in an emergency.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              02
            </div>

            <h3>
              Check before you go
            </h3>

            <p>
              Use the Safety Map and community reviews to know what an
              area is really like before you visit.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              03
            </div>

            <h3>
              Stay protected on the move
            </h3>

            <p>
              Share your journey, and trigger SOS instantly whenever you
              need real help, fast.
            </p>

          </div>


          <div className="step-card">

            <div className="step-number">
              04
            </div>

            <h3>
              Report and help others
            </h3>

            <p>
              Log incidents and unsafe spots so the whole community stays
              informed and safer together.
            </p>

          </div>

        </div>

      </section>


      {/* Emergency Section */}
      <section className="emergency-section">

        <div>

          <p className="section-tag">
            EMERGENCY SUPPORT
          </p>

          <h2>
            When every second matters.
          </h2>

          <p>
            Quickly access SOS, emergency contacts, location sharing and
            other safety resources from one place.
          </p>

        </div>


        <button
          onClick={() =>
            handleProtectedFeature("/emergency")
          }
        >
          Emergency Center
        </button>

      </section>


      {/* Footer */}
      <footer>

        <h3>
          🛡️ SafeSpot
        </h3>

        <p>
          Women's Safety & Awareness Platform
        </p>

        <p>
          © 2026 SafeSpot. Stay aware. Stay safe.
        </p>

      </footer>

    </div>
  );
}

export default Home;
