import { useState } from "react";
import "./Reviews.css";

function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [place, setPlace] = useState("");
  const [rating, setRating] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!place.trim() || !rating || !reviewText.trim()) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Your review has been submitted successfully.");

    setPlace("");
    setRating("");
    setReviewText("");
  };

  return (
    <div className="reviews-page">

      <div className="reviews-header">
        <p className="reviews-tag">SPOT REVIEWS</p>

        <h1>Explore Safety Reviews</h1>

        <p>
          Read experiences shared by the SafeSpot community.
        </p>
      </div>


      <div className="reviews-search">

        <input
          type="text"
          placeholder="Search a place or area..."
        />

        <button>Search</button>

      </div>


      <div className="reviews-grid">

        <div className="review-card">

          <div className="review-top">

            <div className="place-icon">A</div>

            <div>
              <h3>Andheri Station Area</h3>
              <p>Mumbai, Maharashtra</p>
            </div>

          </div>

          <div className="rating">
            ★★★★☆
            <span>4.0 / 5</span>
          </div>

          <p className="review-text">
            Generally crowded and well-lit during the evening.
            Users recommend staying aware around less crowded lanes.
          </p>

          <span className="safety-badge safe">
            Generally Safe
          </span>

        </div>


        <div className="review-card">

          <div className="review-top">

            <div className="place-icon">M</div>

            <div>
              <h3>Malad West</h3>
              <p>Mumbai, Maharashtra</p>
            </div>

          </div>

          <div className="rating">
            ★★★★☆
            <span>4.2 / 5</span>
          </div>

          <p className="review-text">
            Busy area with good public activity. Some users recommend
            avoiding isolated roads late at night.
          </p>

          <span className="safety-badge safe">
            Generally Safe
          </span>

        </div>


        <div className="review-card">

          <div className="review-top">

            <div className="place-icon">P</div>

            <div>
              <h3>Panvel Market</h3>
              <p>Navi Mumbai, Maharashtra</p>
            </div>

          </div>

          <div className="rating">
            ★★★☆☆
            <span>3.4 / 5</span>
          </div>

          <p className="review-text">
            Crowded during the day but some areas become quieter
            later in the evening.
          </p>

          <span className="safety-badge moderate">
            Moderate
          </span>

        </div>

      </div>


      {/* SHARE EXPERIENCE */}

      <div className="write-review">

        <div>
          <h2>Share Your Experience</h2>

          <p>
            Help others make safer decisions by sharing your experience.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setSuccess("");
          }}
        >
          {showForm ? "Close" : "Write a Review"}
        </button>

      </div>


      {/* REVIEW FORM */}

      {showForm && (

        <div
          style={{
            marginTop: "25px",
            padding: "30px",
            background: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "18px"
          }}
        >

          <h2 style={{ marginTop: 0 }}>
            Write Your Review
          </h2>

          <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "18px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600"
                }}
              >
                Place or Area
              </label>

              <input
                type="text"
                placeholder="Enter place or area"
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  boxSizing: "border-box"
                }}
              />

            </div>


            <div style={{ marginBottom: "18px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600"
                }}
              >
                Safety Rating
              </label>

              <select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "1px solid #ddd",
                  borderRadius: "10px"
                }}
              >
                <option value="">Select rating</option>
                <option value="5">★★★★★ — Very Safe</option>
                <option value="4">★★★★☆ — Safe</option>
                <option value="3">★★★☆☆ — Moderate</option>
                <option value="2">★★☆☆☆ — Needs Attention</option>
                <option value="1">★☆☆☆☆ — Unsafe</option>
              </select>

            </div>


            <div style={{ marginBottom: "18px" }}>

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600"
                }}
              >
                Your Experience
              </label>

              <textarea
                rows="5"
                placeholder="Share your experience about this area..."
                value={reviewText}
                onChange={(e) => {
                  setReviewText(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  resize: "vertical",
                  boxSizing: "border-box"
                }}
              ></textarea>

            </div>


            <button
              type="submit"
              style={{
                border: "none",
                borderRadius: "10px",
                padding: "13px 22px",
                background: "#7c3aed",
                color: "white",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Submit Review
            </button>


            {error && (
              <p
                style={{
                  marginTop: "15px",
                  color: "#b91c1c",
                  fontWeight: "600"
                }}
              >
                {error}
              </p>
            )}


            {success && (
              <p
                style={{
                  marginTop: "15px",
                  color: "#15803d",
                  fontWeight: "600"
                }}
              >
                {success}
              </p>
            )}

          </form>

        </div>

      )}

    </div>
  );
}

export default Reviews;
