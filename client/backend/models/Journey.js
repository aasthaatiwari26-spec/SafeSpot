const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        start: {
            type: String,
            required: true,
            trim: true,
        },

        destination: {
            type: String,
            required: true,
            trim: true,
        },

        contact: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["Active", "Completed", "Cancelled"],
            default: "Active",
        },

        startedAt: {
            type: Date,
            default: Date.now,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Journey", journeySchema);