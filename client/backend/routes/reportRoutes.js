import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, description, category, lng, lat } = req.body;
    
    const newReport = new Report({
      title,
      description,
      category,
      location: {
        type: "Point",
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });

    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: "Error saving report" });
  }
});

router.get("/nearby", async (req, res) => {
  try {
    const { lng, lat, maxDistance = 5000 } = req.query;

    const nearbyReports = await Report.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      }
    });
    
    res.json(nearbyReports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nearby reports" });
  }
});

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reports" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting report" });
  }
});

export default router;