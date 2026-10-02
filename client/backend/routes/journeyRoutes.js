const express = require("express");
const Journey = require("../models/Journey");

const router = express.Router();


// Start a new journey
router.post("/", async (req, res) => {
    try {
        const {
            userId,
            start,
            destination,
            contact
        } = req.body;

        if (!userId || !start || !destination) {
            return res.status(400).json({
                message: "User, starting point and destination are required."
            });
        }

        const journey = new Journey({
            userId,
            start,
            destination,
            contact: contact || ""
        });

        const savedJourney = await journey.save();

        res.status(201).json({
            message: "Journey started successfully.",
            journey: savedJourney
        });

    } catch (error) {
        console.error("Error starting journey:", error);

        res.status(500).json({
            message: "Failed to start journey."
        });
    }
});


// Get journey history for a user
router.get("/:userId", async (req, res) => {
    try {
        const journeys = await Journey.find({
            userId: req.params.userId
        }).sort({
            createdAt: -1
        });

        res.json(journeys);

    } catch (error) {
        console.error("Error fetching journey history:", error);

        res.status(500).json({
            message: "Failed to fetch journey history."
        });
    }
});


// Complete a journey
router.put("/:id/complete", async (req, res) => {
    try {
        const journey = await Journey.findByIdAndUpdate(
            req.params.id,
            {
                status: "Completed",
                completedAt: new Date()
            },
            {
                new: true
            }
        );

        if (!journey) {
            return res.status(404).json({
                message: "Journey not found."
            });
        }

        res.json({
            message: "Journey completed successfully.",
            journey
        });

    } catch (error) {
        console.error("Error completing journey:", error);

        res.status(500).json({
            message: "Failed to complete journey."
        });
    }
});


// Cancel a journey
router.put("/:id/cancel", async (req, res) => {
    try {
        const journey = await Journey.findByIdAndUpdate(
            req.params.id,
            {
                status: "Cancelled",
                completedAt: new Date()
            },
            {
                new: true
            }
        );

        if (!journey) {
            return res.status(404).json({
                message: "Journey not found."
            });
        }

        res.json({
            message: "Journey cancelled successfully.",
            journey
        });

    } catch (error) {
        console.error("Error cancelling journey:", error);

        res.status(500).json({
            message: "Failed to cancel journey."
        });
    }
});


// Delete a journey
router.delete("/:id", async (req, res) => {
    try {
        const journey = await Journey.findByIdAndDelete(
            req.params.id
        );

        if (!journey) {
            return res.status(404).json({
                message: "Journey not found."
            });
        }

        res.json({
            message: "Journey deleted successfully."
        });

    } catch (error) {
        console.error("Error deleting journey:", error);

        res.status(500).json({
            message: "Failed to delete journey."
        });
    }
});


module.exports = router;