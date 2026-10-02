import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
    const navigate = useNavigate();

    return (
        <div className="about-page">

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <p className="about-tag">ABOUT SAFESPOT</p>

                    <h1>
                        Your Safety.
                        <br />
                        <span>Your Voice. Your Community.</span>
                    </h1>

                    <p className="about-hero-text">
                        SafeSpot is a women’s safety awareness and reporting web
                        application designed to help users make informed safety
                        decisions, stay connected with trusted people, and access
                        emergency support when needed.
                    </p>

                    <button
                        className="about-primary-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        Explore SafeSpot
                    </button>
                </div>
            </section>

            {/* What is SafeSpot */}
            <section className="about-section">
                <div className="section-heading">
                    <p className="section-tag">WHAT IS SAFESPOT?</p>
                    <h2>Safety through awareness and community</h2>
                </div>

                <div className="about-intro-card">
                    <p>
                        SafeSpot brings different safety tools together in one
                        web application. Users can check community-based area
                        information, plan safer journeys, manage trusted contacts,
                        report incidents, and access emergency resources.
                    </p>

                    <p>
                        The goal is to make safety information easier to access
                        while encouraging awareness, responsible reporting, and
                        community participation.
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-section">
                <div className="section-heading">
                    <p className="section-tag">HOW IT WORKS</p>
                    <h2>Simple steps to use SafeSpot</h2>
                    <p>
                        SafeSpot provides a simple flow to help users stay informed
                        and prepared.
                    </p>
                </div>

                <div className="steps-grid">

                    <div className="step-card">
                        <div className="step-number">01</div>
                        <h3>Create Your Account</h3>
                        <p>
                            Sign up and create your SafeSpot account to access
                            personalized safety features.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">02</div>
                        <h3>Check Your Area</h3>
                        <p>
                            Explore the Safety Map and community reviews to learn
                            about safety experiences in different areas.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">03</div>
                        <h3>Plan a Safe Journey</h3>
                        <p>
                            Enter your starting point and destination to plan your
                            journey and stay connected with your safety circle.
                        </p>
                    </div>

                    <div className="step-card">
                        <div className="step-number">04</div>
                        <h3>Get Help When Needed</h3>
                        <p>
                            Access the Emergency Center, trusted contacts, location
                            sharing, and other available safety resources.
                        </p>
                    </div>

                </div>
            </section>

            {/* Features */}
            <section className="about-section">
                <div className="section-heading">
                    <p className="section-tag">KEY FEATURES</p>
                    <h2>Everything in one place</h2>
                </div>

                <div className="features-grid">

                    <div className="feature-card">
                        <h3>Safety Map</h3>
                        <p>
                            Explore community-based safety information for different
                            areas.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Safe Journey</h3>
                        <p>
                            Plan your journey and stay connected with your trusted
                            safety circle.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Safety Circle</h3>
                        <p>
                            Manage trusted contacts who can be reached when support
                            is needed.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Emergency Center</h3>
                        <p>
                            Quickly access emergency resources and location-sharing
                            options.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Report Incident</h3>
                        <p>
                            Share safety-related incidents responsibly to contribute
                            to community awareness.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3>Community Reviews</h3>
                        <p>
                            Read and share experiences that can help others make
                            better-informed decisions.
                        </p>
                    </div>

                </div>
            </section>

            {/* Community Safety */}
            <section className="community-section">
                <div className="community-content">
                    <p className="section-tag">COMMUNITY-BASED SAFETY</p>

                    <h2>
                        Every experience can help build awareness.
                    </h2>

                    <p>
                        SafeSpot uses community experiences and reviews to provide
                        safety-related information. These ratings are not absolute
                        guarantees of safety. An area may feel different depending
                        on the time, route, circumstances, and individual experience.
                    </p>

                    <div className="community-points">
                        <div>
                            <strong>Share</strong>
                            <span>Responsible experiences and reports</span>
                        </div>

                        <div>
                            <strong>Learn</strong>
                            <span>Understand safety experiences around you</span>
                        </div>

                        <div>
                            <strong>Support</strong>
                            <span>Help others make informed decisions</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Awareness Link */}
            <section className="about-awareness-link">
                <div className="about-awareness-content">
                    <p className="section-tag">LEARN MORE</p>

                    <h2>Want to learn more about staying safe?</h2>

                    <p>
                        Explore practical safety tips, digital safety guidance,
                        travel awareness, and community safety practices.
                    </p>

                    <button onClick={() => navigate("/awareness")}>
                        Explore Safety Awareness
                    </button>
                </div>
            </section>

            {/* Safety Note */}
            <section className="safety-note-section">
                <div className="safety-note">
                    <h2>Important Safety Note</h2>

                    <p>
                        SafeSpot is designed as a safety awareness and support
                        platform. It does not replace police, emergency services,
                        medical professionals, or other official authorities.
                    </p>

                    <button
                        className="about-secondary-btn"
                        onClick={() => navigate("/emergency")}
                    >
                        Visit Emergency Center
                    </button>
                </div>
            </section>

        </div>
    );
}

export default About;