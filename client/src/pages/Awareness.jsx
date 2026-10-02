import React from "react";
import { useNavigate } from "react-router-dom";
import "./Awareness.css";

function Awareness() {
    const navigate = useNavigate();

    return (
        <div className="awareness-page">

            {/* Hero Section */}
            <section className="awareness-hero">
                <div className="awareness-hero-content">
                    <p className="awareness-tag">SAFETY AWARENESS</p>

                    <h1>
                        Stay Aware. <span>Stay Safe.</span>
                    </h1>

                    <p className="awareness-hero-text">
                        Learn practical safety habits, digital safety practices,
                        travel awareness and emergency preparedness to make
                        safer decisions in everyday life.
                    </p>
                </div>
            </section>


            {/* Everyday Safety */}
            <section className="awareness-section">
                <div className="section-heading">
                    <p className="section-tag">EVERYDAY SAFETY</p>

                    <h2>Small habits can make a big difference</h2>

                    <p>
                        Staying aware of your surroundings and trusting your instincts
                        can help you respond better to unexpected situations.
                    </p>
                </div>

                <div className="awareness-grid">

                    <div className="awareness-card">
                        <h3>Stay Aware of Your Surroundings</h3>
                        <p>
                            Avoid distractions when walking alone, especially in unfamiliar
                            or crowded areas. Pay attention to your surroundings and nearby exits.
                        </p>
                    </div>

                    <div className="awareness-card">
                        <h3>Trust Your Instincts</h3>
                        <p>
                            If a place, person or situation makes you uncomfortable,
                            move towards a safer and more populated location.
                        </p>
                    </div>

                    <div className="awareness-card">
                        <h3>Share Your Plans</h3>
                        <p>
                            Let someone you trust know where you are going when travelling
                            alone or visiting an unfamiliar place.
                        </p>
                    </div>

                </div>
            </section>


            {/* Travel Safety */}
            <section className="awareness-highlight">
                <div className="highlight-content">

                    <p className="section-tag">TRAVEL SAFETY</p>

                    <h2>Plan your journey before you start</h2>

                    <p>
                        Check your route, keep your phone charged and stay connected
                        with someone you trust during important journeys.
                    </p>

                    <div className="highlight-points">

                        <div>
                            <strong>Plan Your Route</strong>
                            <span>Know your starting point, destination and possible alternatives.</span>
                        </div>

                        <div>
                            <strong>Keep Your Phone Ready</strong>
                            <span>Maintain sufficient battery and keep emergency contacts accessible.</span>
                        </div>

                        <div>
                            <strong>Stay Connected</strong>
                            <span>Inform a trusted person about your journey when necessary.</span>
                        </div>

                    </div>

                </div>
            </section>


            {/* Digital Safety */}
            <section className="awareness-section digital-section">

                <div className="section-heading">
                    <p className="section-tag">DIGITAL SAFETY</p>

                    <h2>Protect yourself online</h2>

                    <p>
                        Online safety is an important part of personal safety.
                        Be careful about what you share and who you trust online.
                    </p>
                </div>

                <div className="awareness-grid">

                    <div className="awareness-card">
                        <h3>Protect Personal Information</h3>
                        <p>
                            Avoid publicly sharing sensitive information such as your
                            home address, passwords or financial details.
                        </p>
                    </div>

                    <div className="awareness-card">
                        <h3>Use Strong Passwords</h3>
                        <p>
                            Use unique passwords for important accounts and enable
                            additional security features such as two-factor authentication.
                        </p>
                    </div>

                    <div className="awareness-card">
                        <h3>Be Careful With Links</h3>
                        <p>
                            Do not open suspicious links or share personal information
                            with unknown websites, messages or accounts.
                        </p>
                    </div>

                </div>
            </section>


            {/* Emergency Awareness */}
            <section className="emergency-awareness">

                <div className="emergency-awareness-content">

                    <p className="section-tag">EMERGENCY AWARENESS</p>

                    <h2>Know what to do when you need help</h2>

                    <p>
                        In an emergency, try to stay calm, move towards a safer location
                        and contact appropriate emergency services or a trusted person.
                    </p>

                    <button
                        onClick={() => navigate("/emergency")}
                    >
                        Open Emergency Center
                    </button>

                </div>

            </section>


            {/* Community Awareness */}
            <section className="awareness-section community-awareness">

                <div className="section-heading">

                    <p className="section-tag">COMMUNITY SAFETY</p>

                    <h2>Safety is a shared responsibility</h2>

                    <p>
                        Sharing genuine experiences and useful safety information can
                        help communities become more aware of potential safety concerns.
                    </p>

                </div>

                <div className="community-awareness-points">

                    <div>
                        <h3>Share Experiences</h3>
                        <p>
                            Report genuine incidents and safety concerns to help others
                            make informed decisions.
                        </p>
                    </div>

                    <div>
                        <h3>Help Others Stay Informed</h3>
                        <p>
                            Encourage friends and family to follow practical safety habits.
                        </p>
                    </div>

                    <div>
                        <h3>Be Responsible</h3>
                        <p>
                            Avoid spreading unverified information that may unnecessarily
                            create fear or confusion.
                        </p>
                    </div>

                </div>

            </section>


            {/* Final CTA */}
            <section className="awareness-final">

                <div>
                    <h2>Ready to take control of your safety?</h2>

                    <p>
                        Use SafeSpot tools to check areas, plan journeys and
                        stay connected with your trusted contacts.
                    </p>

                    <button
                        onClick={() => navigate("/dashboard")}
                    >
                        Go to Dashboard
                    </button>
                </div>

            </section>

        </div>
    );
}

export default Awareness;