const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Evidence = require("../models/Evidence");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "safespot_evidence",
        resource_type: "auto", // images, videos, docs sab allow karega
    },
});

const upload = multer({ storage: storage });

// ADD Evidence
router.post("/", protect, upload.array("files", 4), async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const fileUrls = req.files && req.files.length > 0
            ? req.files.map((file) => file.path)
            : [];

        const newEvidence = new Evidence({
            userId: req.user._id,
            title,
            description,
            fileUrls,
        });

        const savedEvidence = await newEvidence.save();
        res.status(201).json(savedEvidence);
    } catch (error) {
        console.error("Error saving evidence:", error);
        res.status(500).json({ message: "Failed to save evidence." });
    }
});

// GET all evidence for logged-in user
router.get("/", protect, async (req, res) => {
    try {
        const evidence = await Evidence.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(evidence);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch evidence." });
    }
});

// DELETE evidence
router.delete("/:id", protect, async (req, res) => {
    try {
        await Evidence.findByIdAndDelete(req.params.id);
        res.json({ message: "Evidence deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete evidence." });
    }
});

module.exports = router;