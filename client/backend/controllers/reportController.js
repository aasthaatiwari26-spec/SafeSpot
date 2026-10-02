import Report from "../models/Report.js";

export const createReport = async (req, res) => {
  try {
    const { title, description, category, longitude, latitude } = req.body;

    const newReport = new Report({
      title,
      description,
      category,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)] // [lng, lat] order zaroori hai[cite: 5]
      },
      reportedBy: req.user ? req.user._id : null
    });

    const savedReport = await newReport.save();
    res.status(201).json({ success: true, data: savedReport });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getNearbyReports = async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query; // distance in meters[cite: 5]

    if (!lng || !lat) {
      return res.status(400).json({ success: false, message: "Longitude and Latitude are required" });
    }

    const nearbyReports = await Report.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });

    res.status(200).json({ success: true, count: nearbyReports.length, data: nearbyReports });
  } catch (error) {
    console.error("Error fetching nearby reports:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    await Report.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};