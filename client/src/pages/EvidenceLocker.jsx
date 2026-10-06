import React, { useState, useEffect } from "react";
import "./EvidenceLocker.css";

function EvidenceLocker() {
  const [evidence, setEvidence] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEvidence();
  }, []);

  const fetchEvidence = async () => {
    try {
      const response = await fetch("https://safespot-backend-ltud.onrender.com/api/evidence", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setEvidence(data);
      }
    } catch (error) {
      console.error("Error fetching evidence:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 4) {
      setMessage("You can only select up to 4 files.");
      clearFiles();
      return;
    }

    setFiles(selectedFiles);
    setMessage("");
  };

  const clearFiles = () => {
    setFiles([]);
    document.getElementById("evidence-file-input").value = "";
  };

  const handleAddEvidence = async (e) => {
    e.preventDefault();

    if (!title || !description.trim() || files.length === 0) {
      setMessage("Please fill in all required fields and select at least one file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description.trim());
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("https://safespot-backend-ltud.onrender.com/api/evidence", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setEvidence((prev) => [data, ...prev]);
        setTitle("");
        setDescription("");
        clearFiles();
        setMessage("Evidence added successfully.");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Failed to add evidence.");
      }
    } catch (error) {
      console.error("Error adding evidence:", error);
      setMessage("Server error. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://safespot-backend-ltud.onrender.com/api/evidence/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setEvidence((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error("Error deleting evidence:", error);
    }
  };

  return (
    <div className="evidence-page">
      <section className="evidence-hero">
        <div className="evidence-hero-content">
          <p className="evidence-tag">EVIDENCE LOCKER</p>
          <h1>Keep Your <span>Evidence Organized</span></h1>
          <p>Store important evidence details in one organized place so they can be easily managed when needed.</p>
        </div>
      </section>

      <section className="evidence-section">
        <div className="evidence-form-card">
          <div className="form-heading">
            <p className="section-tag">ADD EVIDENCE</p>
            <h2>Save an Evidence Record</h2>
            <p>Add up to 4 files along with a title and description.</p>
          </div>

          <form onSubmit={handleAddEvidence}>

            <div className="form-group">
              <label>Evidence Title *</label>
              <select
                className="form-select"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setMessage(""); }}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right .7em top 50%",
                  backgroundSize: ".65em auto"
                }}
              >
                <option value="" disabled>Select evidence type</option>
                <option value="Incident Photo">Incident Photo</option>
                <option value="Video Footage">Video Footage</option>
                <option value="Audio Recording">Audio Recording</option>
                <option value="Medical Report">Medical Report</option>
                <option value="Police FIR / Document">Police FIR / Document</option>
                <option value="Other Evidence">Other Evidence</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                placeholder="Add details about this evidence (Required)..."
                value={description}
                onChange={(e) => { setDescription(e.target.value); setMessage(""); }}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Select Files (Max 4) *</label>
              <input
                type="file"
                id="evidence-file-input"
                multiple
                onChange={handleFileChange}
              />
              <small>Select up to 4 images, videos, or documents.</small>

              {files.length > 0 && (
                <div style={{ marginTop: "12px", padding: "10px", backgroundColor: "#f3f4f6", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "8px", color: "#374151" }}>Selected Files ({files.length}/4):</p>
                  {files.map((f, index) => (
                    <div key={index} style={{ fontSize: "13px", color: "#4b5563", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      📎 {f.name}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={clearFiles}
                    style={{ marginTop: "8px", width: "100%", padding: "6px 12px", backgroundColor: "#ff4d4f", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}
                  >
                    Remove All Selected Files
                  </button>
                </div>
              )}
            </div>

            {message && (
              <p className="evidence-message" style={{ color: message.includes("❌") ? "#dc2626" : "#16a34a" }}>
                {message}
              </p>
            )}

            <button type="submit" className="add-evidence-btn">
              Add Evidence
            </button>
          </form>
        </div>
      </section>

      <section className="evidence-list-section">
        <div className="section-heading">
          <p className="section-tag">YOUR RECORDS</p>
          <h2>Saved Evidence</h2>
          <p>Evidence records added during this session will appear here.</p>
        </div>

        {evidence.length === 0 ? (
          <div className="empty-evidence">
            <h3>No evidence added yet</h3>
            <p>Your saved evidence records will appear here.</p>
          </div>
        ) : (
          <div className="evidence-grid">
            {evidence.map((item) => (
              <div className="evidence-card" key={item._id}>
                <div className="evidence-file-icon">FILES</div>
                <div className="evidence-card-content">
                  <h3>{item.title}</h3>
                  {item.fileUrls.map((url, i) => (
                    <p key={i} className="file-name" style={{ marginBottom: "2px", fontSize: "12px" }}>
                      📎 <a href={url} target="_blank" rel="noreferrer">View File {i + 1}</a>
                    </p>
                  ))}
                  <p className="evidence-description" style={{ marginTop: "8px" }}>{item.description}</p>
                  <button
                    className="delete-evidence-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete Record
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="evidence-note-section">
        <div className="evidence-note">
          <h2>Privacy & Security</h2>
          <p>
            Evidence files are securely uploaded and stored so they can be
            accessed when needed.
          </p>
        </div>
      </section>
    </div>
  );
}

export default EvidenceLocker;