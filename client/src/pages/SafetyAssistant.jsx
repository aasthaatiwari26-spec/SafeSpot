import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SafetyAssistant.css";

function SafetyAssistant() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Hi! I'm SafeSpot Safety Assistant. Ask me about travel safety, emergency situations, digital safety, or general safety awareness.",
    },
  ]);

  const getResponse = (input) => {
    const text = input.toLowerCase();

    if (
      text.includes("emergency") ||
      text.includes("sos") ||
      text.includes("danger")
    ) {
      return "If you are in immediate danger, move to a safer or populated place and contact local emergency services. You can also use SafeSpot's Emergency Center for quick access to emergency resources.";
    }

    if (
      text.includes("travel") ||
      text.includes("journey") ||
      text.includes("route")
    ) {
      return "Before starting a journey, plan your route, keep your phone charged, share your journey with a trusted contact, and prefer well-lit and populated routes whenever possible.";
    }

    if (
      text.includes("digital") ||
      text.includes("online") ||
      text.includes("password")
    ) {
      return "For digital safety, use strong unique passwords, avoid sharing sensitive personal information, enable two-factor authentication where available, and be careful with unknown links or messages.";
    }

    if (
      text.includes("location") ||
      text.includes("share")
    ) {
      return "Share your location only with people you trust. For a journey, you can use SafeSpot's Safe Journey feature to keep trusted contacts informed.";
    }

    if (
      text.includes("report") ||
      text.includes("incident")
    ) {
      return "If you experience or notice a safety concern, you can use SafeSpot's Report Incident feature to share the information and help increase community awareness.";
    }

    if (
      text.includes("area") ||
      text.includes("place") ||
      text.includes("safe")
    ) {
      return "Area safety can vary depending on time, route and individual circumstances. Check community reports and reviews for awareness, but always use your own judgment while travelling.";
    }

    return "I can help with general safety awareness, travel safety, emergency situations, digital safety, location sharing, and incident reporting. Try asking me one of these questions.";
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      return;
    }

    const userMessage = {
      type: "user",
      text: question.trim(),
    };

    const assistantMessage = {
      type: "assistant",
      text: getResponse(question),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);

    setQuestion("");
  };

  const handleQuickQuestion = (text) => {
    const userMessage = {
      type: "user",
      text,
    };

    const assistantMessage = {
      type: "assistant",
      text: getResponse(text),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ]);
  };

  return (
    <div className="assistant-page">

      {/* Hero */}
      <section className="assistant-hero">
        <div className="assistant-hero-content">

          <p className="assistant-tag">
            SAFETY ASSISTANT
          </p>

          <h1>
            Your Personal <span>Safety Guide</span>
          </h1>

          <p>
            Get quick safety guidance and practical suggestions
            for everyday situations.
          </p>

        </div>
      </section>


      {/* Assistant Section */}
      <section className="assistant-section">

        <div className="assistant-container">

          {/* Intro */}
          <div className="assistant-intro">

            <p className="section-tag">
              ASK SAFESPOT
            </p>

            <h2>
              How can I help you stay safe?
            </h2>

            <p>
              Ask a safety-related question or choose one of the
              common questions below.
            </p>

          </div>


          {/* Chat Box */}
          <div className="assistant-card">

            <div className="chat-header">

              <div>
                <h3>SafeSpot Assistant</h3>
                <p>General safety guidance</p>
              </div>

              <span className="online-status">
                Available
              </span>

            </div>


            {/* Messages */}
            <div className="chat-messages">

              {messages.map((message, index) => (

                <div
                  key={index}
                  className={
                    message.type === "user"
                      ? "message user-message"
                      : "message assistant-message"
                  }
                >

                  <p>
                    {message.text}
                  </p>

                </div>

              ))}

            </div>


            {/* Input */}
            <form
              className="assistant-input"
              onSubmit={handleSend}
            >

              <input
                type="text"
                placeholder="Ask a safety question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <button type="submit">
                Send
              </button>

            </form>

          </div>


          {/* Quick Questions */}
          <div className="quick-section">

            <p className="section-tag">
              QUICK QUESTIONS
            </p>

            <div className="quick-grid">

              <button
                onClick={() =>
                  handleQuickQuestion(
                    "What should I do in an emergency?"
                  )
                }
              >
                What should I do in an emergency?
              </button>

              <button
                onClick={() =>
                  handleQuickQuestion(
                    "How can I stay safe while travelling?"
                  )
                }
              >
                How can I stay safe while travelling?
              </button>

              <button
                onClick={() =>
                  handleQuickQuestion(
                    "How can I stay safe online?"
                  )
                }
              >
                How can I stay safe online?
              </button>

              <button
                onClick={() =>
                  handleQuickQuestion(
                    "How should I share my location safely?"
                  )
                }
              >
                How should I share my location safely?
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* Feature Links */}
      <section className="assistant-tools">

        <div className="assistant-tools-content">

          <div className="tool-text">

            <p className="section-tag">
              EXPLORE SAFESPOT
            </p>

            <h2>
              More tools for your safety
            </h2>

            <p>
              Use SafeSpot's other features to plan journeys,
              report concerns and access emergency resources.
            </p>

          </div>


          <div className="assistant-tool-buttons">

            <button
              onClick={() => navigate("/safe-journey")}
            >
              Safe Journey
            </button>

            <button
              onClick={() => navigate("/community-reports")}
            >
              Community Reports
            </button>

            <button
              onClick={() => navigate("/emergency")}
            >
              Emergency Center
            </button>

          </div>

        </div>

      </section>


      {/* Safety Note */}
      <section className="assistant-note-section">

        <div className="assistant-note">

          <h2>
            Important Safety Note
          </h2>

          <p>
            SafeSpot Safety Assistant provides general awareness
            information and is not a replacement for emergency
            services, professional advice or official authorities.
            In an immediate emergency, contact appropriate
            emergency services.
          </p>

        </div>

      </section>

    </div>
  );
}

export default SafetyAssistant;