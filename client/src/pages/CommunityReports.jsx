import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommunityReports.css";

function CommunityReports() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      id: 1,
      location: "Andheri West",
      category: "Street Safety",
      date: "Recently Reported",
      title: "Poor lighting reported in a side street",
      description:
        "A community member reported that a side street had limited lighting during evening hours.",
      status: "Community Report",
      details:
        "The report highlights limited lighting on a side street during evening hours. Users travelling through the area are advised to remain aware of their surroundings and prefer well-lit routes when possible.",
    },
    {
      id: 2,
      location: "Malad West",
      category: "Transport",
      date: "Recently Reported",
      title: "Crowded area near the station",
      description:
        "A user reported heavy crowding around the station area during peak hours.",
      status: "Community Report",
      details:
        "The community report mentions heavy crowding around the station during peak hours. Travellers may want to stay aware of their belongings and surroundings in crowded areas.",
    },
    {
      id: 3,
      location: "Panvel Market",
      category: "Public Area",
      date: "Recently Reported",
      title: "Low visibility reported after evening",
      description:
        "A community member shared a concern about visibility in a less crowded area after evening.",
      status: "Community Report",
      details:
        "A user reported reduced visibility in a less crowded area after evening. Consider using well-lit and populated routes whenever possible.",
    },
    {
      id: 4,
      location: "Borivali West",
      category: "Street Safety",
      date: "Recently Reported",
      title: "Community safety concern",
      description:
        "A safety concern was shared regarding a particular stretch of road.",
      status: "Community Report",
      details:
        "A community member shared a general safety concern regarding a particular stretch of road. Users should consider their surroundings and choose routes that feel comfortable and appropriate.",
    },
  ];

  const categories = [
    "All",
    "Street Safety",
    "Transport",
    "Public Area",
  ];

  const filteredReports =
    selectedCategory === "All"
      ? reports
      : reports.filter(
          (report) => report.category === selectedCategory
        );

  const handleViewReport = (report) => {
    if (selectedReport?.id === report.id) {
      setSelectedReport(null);
    } else {
      setSelectedReport(report);
    }
  };

  return (
    <div className="community-page">

      {/* Hero */}
      <section className="community-hero">
        <div className="community-hero-content">

          <p className="community-tag">
            COMMUNITY REPORTS
          </p>

          <h1>
            Stay Informed About <span>Safety Concerns</span>
          </h1>

          <p>
            Explore community-shared safety reports and learn about
            experiences reported in different areas.
          </p>

        </div>
      </section>


      {/* Information */}
      <section className="community-info-section">

        <div className="community-info">

          <div>

            <p className="section-tag">
              COMMUNITY AWARENESS
            </p>

            <h2>
              Real experiences can help others stay informed.
            </h2>

            <p>
              Community Reports allows users to share safety concerns
              and experiences about places they visit. Use these reports
              as awareness information and always consider your own
              surroundings and circumstances.
            </p>

          </div>

          <button
            onClick={() => navigate("/report-incident")}
          >
            Report an Incident
          </button>

        </div>

      </section>


      {/* Reports */}
      <section className="community-reports-section">

        <div className="section-heading">

          <p className="section-tag">
            REPORTED CONCERNS
          </p>

          <h2>
            Community Safety Reports
          </h2>

          <p>
            Browse reports shared by the SafeSpot community.
          </p>

        </div>


        {/* Filters */}
        <div className="category-filter">

          {categories.map((category) => (

            <button
              key={category}
              className={
                selectedCategory === category
                  ? "filter-btn active"
                  : "filter-btn"
              }
              onClick={() => {
                setSelectedCategory(category);
                setSelectedReport(null);
              }}
            >
              {category}
            </button>

          ))}

        </div>


        {/* Report Cards */}
        {filteredReports.length > 0 ? (

          <div className="reports-grid">

            {filteredReports.map((report) => (

              <div
                className="report-card"
                key={report.id}
              >

                <div className="report-card-top">

                  <span className="report-category">
                    {report.category}
                  </span>

                  <span className="report-status">
                    {report.status}
                  </span>

                </div>


                <h3>
                  {report.title}
                </h3>


                <div className="report-location">
                  Location: {report.location}
                </div>


                <p className="report-date">
                  {report.date}
                </p>


                <p className="report-description">
                  {report.description}
                </p>


                <button
                  className="view-report-btn"
                  onClick={() => handleViewReport(report)}
                >
                  {selectedReport?.id === report.id
                    ? "Hide Report"
                    : "View Report"}
                </button>


                {/* Expanded Report */}
                {selectedReport?.id === report.id && (

                  <div className="report-details">

                    <div className="details-divider"></div>

                    <h4>
                      Report Details
                    </h4>

                    <p>
                      {report.details}
                    </p>


                    <div className="report-detail-info">

                      <div>
                        <strong>Location</strong>
                        <span>{report.location}</span>
                      </div>

                      <div>
                        <strong>Category</strong>
                        <span>{report.category}</span>
                      </div>

                      <div>
                        <strong>Status</strong>
                        <span>{report.status}</span>
                      </div>

                    </div>


                    <div className="report-safety-note">

                      <strong>
                        Safety Reminder
                      </strong>

                      <p>
                        This report is based on a community experience.
                        Conditions may change depending on time, location
                        and circumstances.
                      </p>

                    </div>

                  </div>

                )}

              </div>

            ))}

          </div>

        ) : (

          <div className="no-reports">

            <h3>
              No reports found
            </h3>

            <p>
              There are no community reports in this category yet.
            </p>

          </div>

        )}

      </section>


      {/* Safety Notice */}
      <section className="community-notice-section">

        <div className="community-notice">

          <h2>
            Important Safety Notice
          </h2>

          <p>
            Community reports are based on individual experiences and
            should not be treated as guaranteed safety ratings.
            Situations can change depending on time, location and
            circumstances.
          </p>

        </div>

      </section>


      {/* Final CTA */}
      <section className="community-final">

        <div>

          <h2>
            Have you experienced a safety concern?
          </h2>

          <p>
            Sharing a genuine experience can help other community
            members make more informed decisions.
          </p>

          <button
            onClick={() => navigate("/report-incident")}
          >
            Share Your Experience
          </button>

        </div>

      </section>

    </div>
  );
}

export default CommunityReports;