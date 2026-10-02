const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        incidentType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Pending", "Verified", "Rejected"],
            default: "Pending",
        },
        imageUrls: {
            type: [String],
            default: [],
        },
        geoLoc: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number],
                default: [0, 0],
            },
        },
    },
    { timestamps: true }
);

incidentSchema.index({ geoLoc: "2dsphere" });

module.exports = mongoose.model("Incident", incidentSchema);