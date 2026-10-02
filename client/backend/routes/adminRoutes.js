const express = require("express");
const User = require("../models/User");
const Incident = require("../models/Incident");

const router = express.Router();

// 1. Admin Dashboard Stats
router.get("/dashboard-stats", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ role: "admin" });
        const totalIncidents = await Incident.countDocuments();
        const recentReports = await Incident.find().sort({ createdAt: -1 }).limit(5);
        const recentUsers = await User.find().select("-password").sort({ createdAt: -1 }).limit(5);

        res.status(200).json({
            success: true,
            stats: { totalUsers, totalAdmins, totalIncidents },
            recentReports,
            recentUsers,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. Get all users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Delete user
router.delete("/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 4. Get all incidents
router.get("/incidents", async (req, res) => {
    try {
        const reports = await Incident.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, reports });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 5. Update incident status (Pending -> Reviewed -> Resolved)
router.patch("/incidents/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const updatedIncident = await Incident.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json({ success: true, incident: updatedIncident });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 6. Delete incident
router.delete("/incidents/:id", async (req, res) => {
    try {
        await Incident.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Incident removed by admin" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 7. Analytics Data API
router.get("/analytics", async (req, res) => {
    try {
        const categoryStats = await Incident.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        res.status(200).json({ success: true, categoryStats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;