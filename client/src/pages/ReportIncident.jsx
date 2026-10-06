import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";
import "./ReportIncident.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


function FlyToMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center, map]);

  return null;
}


function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(
        e.latlng.lat,
        e.latlng.lng
      );
    },
  });

  return null;
}


function ReportIncident() {

  const [incidentType, setIncidentType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [mapCenter, setMapCenter] = useState([
    19.0760,
    72.8777
  ]);

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);


  /* =========================
     SEARCH LOCATION
  ========================= */

  const handleSearchLocation = async () => {

    if (!location.trim()) {
      setError("Please enter an area to search.");
      return;
    }

    setError("");

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
      );

      const data = await response.json();

      if (data && data.length > 0) {

        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);

        setMapCenter([
          lat,
          lng
        ]);

        setLatitude(lat);
        setLongitude(lng);

        setError("");

      } else {

        setError(
          "Location not found. Try a broader area name (e.g., 'Andheri, Mumbai')."
        );

      }

    } catch (err) {

      console.error(err);

      setError(
        "Failed to search location."
      );

    }
  };


  /* =========================
     FILE UPLOAD
  ========================= */

  const handleFileChange = (e) => {

    const selectedFiles =
      Array.from(e.target.files);

    // Maximum 4 photos
    if (
      files.length +
      selectedFiles.length >
      4
    ) {

      setError(
        "You can only upload up to 4 images in total."
      );

      return;
    }

    const updatedFiles = [
      ...files,
      ...selectedFiles
    ];

    setFiles(updatedFiles);

    setPreviews(
      updatedFiles.map(
        file => URL.createObjectURL(file)
      )
    );

    setError("");
  };


  /* =========================
     REMOVE FILE
  ========================= */

  const handleRemoveFile = (
    indexToRemove
  ) => {

    const updatedFiles =
      files.filter(
        (_, index) =>
          index !== indexToRemove
      );

    setFiles(updatedFiles);

    setPreviews(
      updatedFiles.map(
        file =>
          URL.createObjectURL(file)
      )
    );

    const fileInput =
      document.getElementById(
        "evidence-upload"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  };


  /* =========================
     CLEAR FILES
  ========================= */

  const clearFiles = () => {

    setFiles([]);
    setPreviews([]);

    const fileInput =
      document.getElementById(
        "evidence-upload"
      );

    if (fileInput) {
      fileInput.value = "";
    }
  };


  /* =========================
     SUBMIT INCIDENT
  ========================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !incidentType ||
      !location.trim() ||
      !date ||
      latitude === null ||
      longitude === null
    ) {

      setError(
        "Please fill in all required fields and ensure the map is pinned."
      );

      setSuccess(false);

      return;
    }


    /* =========================
       GET LOGGED-IN USER
    ========================= */

    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {

      setError(
        "User information not found. Please login again."
      );

      setSuccess(false);

      return;
    }


    let parsedUser;

    try {

      parsedUser =
        JSON.parse(storedUser);

    } catch (error) {

      console.error(
        "Unable to read user information:",
        error
      );

      setError(
        "Invalid user information. Please login again."
      );

      setSuccess(false);

      return;
    }


    const userId =
      parsedUser.id ||
      parsedUser._id;


    if (!userId) {

      setError(
        "User ID not found. Please login again."
      );

      setSuccess(false);

      return;
    }


    setLoading(true);


    /* =========================
       CREATE FORM DATA
    ========================= */

    const formData =
      new FormData();

    formData.append(
      "userId",
      userId
    );

    formData.append(
      "incidentType",
      incidentType
    );

    formData.append(
      "location",
      location
    );

    formData.append(
      "date",
      date
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "latitude",
      latitude
    );

    formData.append(
      "longitude",
      longitude
    );


    /* =========================
       ADD IMAGES
    ========================= */

    files.forEach((file) => {

      formData.append(
        "images",
        file
      );

    });


    try {

      /* =========================
         GET LOGIN TOKEN
      ========================= */

      const token =
        localStorage.getItem(
          "token"
        );


      /* =========================
         SEND TO BACKEND
      ========================= */

      const response =
        await fetch(
          "https://safespot-backend-ltud.onrender.com/api/incidents",
          {
            method: "POST",

            headers: {
              ...(token && {
                "Authorization":
                  `Bearer ${token}`
              })
            },

            body: formData
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to submit."
        );

      }


      /* =========================
         SUCCESS
      ========================= */

      setError("");

      setSuccess(true);

      setIncidentType("");

      setLocation("");

      setDate("");

      setDescription("");

      setLatitude(null);

      setLongitude(null);

      clearFiles();


    } catch (error) {

      console.error(error);

      setError(
        error.message ||
        "Failed to submit report. Please try again."
      );

      setSuccess(false);

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="report-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="report-header">

        <p className="report-tag">
          REPORT INCIDENT
        </p>

        <h1>
          Report a Safety Incident
        </h1>

      </div>


      {/* =========================
          FORM CARD
      ========================= */}

      <div className="report-form-card">

        <h2>
          Incident Details
        </h2>


        <form onSubmit={handleSubmit}>


          {/* INCIDENT TYPE */}

          <div className="report-field">

            <label>
              Incident Type *
            </label>

            <select
              value={incidentType}
              onChange={(e) =>
                setIncidentType(
                  e.target.value
                )
              }
            >

              <option value="">
                Select incident type
              </option>

              <option value="Harassment">
                Harassment
              </option>

              <option value="Theft">
                Theft
              </option>

              <option value="Unsafe Area">
                Unsafe Area
              </option>

              <option value="Suspicious Activity">
                Suspicious Activity
              </option>

              <option value="Poor Lighting">
                Poor Lighting
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* LOCATION */}

          <div className="report-field">

            <label>
              Area / City *
            </label>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <input
                type="text"
                placeholder="e.g., Pune, Maharashtra"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                style={{
                  flex: 1
                }}
              />

              <button
                type="button"
                onClick={
                  handleSearchLocation
                }
                style={{
                  padding:
                    "10px 15px",

                  backgroundColor:
                    "#7c3aed",

                  color: "white",

                  border: "none",

                  borderRadius:
                    "8px",

                  cursor: "pointer",

                  fontWeight: "bold"
                }}
              >
                Search on Map
              </button>

            </div>

          </div>


          {/* MAP */}

          <div className="report-field">

            <label>
              Confirm Location on Map *
            </label>

            <p
              style={{
                fontSize: "12px",
                color: "#888",
                marginBottom: "8px"
              }}
            >
              Click search or tap map to
              drop the pin.
            </p>


            <div
              style={{
                height: "250px",
                borderRadius: "12px",
                overflow: "hidden"
              }}
            >

              <MapContainer
                center={mapCenter}
                zoom={11}
                style={{
                  height: "100%",
                  width: "100%"
                }}
              >

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap"
                />


                <FlyToMap
                  center={mapCenter}
                />


                <LocationPicker
                  onSelect={(
                    lat,
                    lng
                  ) => {

                    setLatitude(lat);

                    setLongitude(lng);

                    setMapCenter([
                      lat,
                      lng
                    ]);

                  }}
                />


                {latitude !== null &&
                  longitude !== null && (

                    <Marker
                      position={[
                        latitude,
                        longitude
                      ]}
                    />

                  )}

              </MapContainer>

            </div>

          </div>


          {/* DATE */}

          <div className="report-field">

            <label>
              Date *
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
            />

          </div>


          {/* DESCRIPTION */}

          <div className="report-field">

            <label>
              Description
            </label>

            <textarea
              placeholder="Describe what happened (optional)..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows="4"
            ></textarea>

          </div>


          {/* EVIDENCE */}

          <div className="report-field">

            <label>
              Upload Evidence (Max 4)
            </label>

            <input
              type="file"
              id="evidence-upload"
              accept="image/*"
              multiple
              onChange={
                handleFileChange
              }
            />


            {previews.length > 0 && (

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "10px"
                }}
              >

                {previews.map(
                  (src, index) => (

                    <div
                      key={index}
                      style={{
                        position:
                          "relative",

                        width: "70px",

                        height: "70px"
                      }}
                    >

                      <img
                        src={src}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit:
                            "cover",
                          borderRadius:
                            "6px",
                          border:
                            "1px solid #ccc"
                        }}
                      />


                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveFile(
                            index
                          )
                        }
                        style={{
                          position:
                            "absolute",

                          top: "-6px",

                          right: "-6px",

                          background:
                            "#ff4d4d",

                          color:
                            "white",

                          border: "none",

                          borderRadius:
                            "50%",

                          width: "22px",

                          height: "22px",

                          cursor:
                            "pointer",

                          fontSize:
                            "12px",

                          fontWeight:
                            "bold",

                          display:
                            "flex",

                          alignItems:
                            "center",

                          justifyContent:
                            "center",

                          boxShadow:
                            "0 2px 4px rgba(0,0,0,0.2)"
                        }}

                        title="Remove image"
                      >
                        ×
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>


          {/* SUBMIT */}

          <button
            type="submit"
            className="report-button"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Submit Report"}

          </button>


          {/* ERROR */}

          {error && (

            <div
              className="report-error"
              style={{
                color: "red",
                marginTop: "10px"
              }}
            >
              {error}
            </div>

          )}


          {/* SUCCESS */}

          {success && (

            <div
              className="report-success"
              style={{
                color: "green",
                marginTop: "10px"
              }}
            >
              Report submitted successfully!
            </div>

          )}

        </form>

      </div>

    </div>

  );
}

export default ReportIncident;