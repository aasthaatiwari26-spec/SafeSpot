const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const twilio = require("twilio");
const Incident = require("../models/Incident");
const TrustedContact = require("../models/TrustedContact");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// CLOUDINARY & MULTER SETUP
// ==========================================
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "safespot_incidents",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

const upload = multer({ storage: storage });

// ==========================================
// SUBMIT NEW INCIDENT
// MULTIPLE PHOTOS + USER ID + SOCKET.IO
// ==========================================
router.post("/", upload.array("images", 4), async (req, res) => {
    try {
        const {
            userId,
            incidentType,
            location,
            date,
            description,
            latitude,
            longitude
        } = req.body;

        if (
            !userId ||
            !incidentType ||
            !location ||
            !date ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        // If files are uploaded, create an array of Cloudinary URLs
        const imageUrls =
            req.files && req.files.length > 0
                ? req.files.map(file => file.path)
                : [];

        const incident = new Incident({
            userId,

            incidentType,

            location,

            date,

            description,

            latitude: parseFloat(latitude),

            longitude: parseFloat(longitude),

            imageUrls,

            geoLoc: {
                type: "Point",

                coordinates: [
                    parseFloat(longitude),
                    parseFloat(latitude)
                ],
            }
        });

        const savedIncident = await incident.save();

        // Socket.io Emit
        if (req.io) {
            req.io.emit("newReport", savedIncident);
        }

        res.status(201).json({
            message: "Incident reported successfully.",
            incident: savedIncident
        });

    } catch (error) {
        console.error("Error creating incident:", error);

        res.status(500).json({
            message: "Failed to submit incident."
        });
    }
});


// ==========================================
// GET ALL INCIDENTS
// ==========================================
router.get("/", async (req, res) => {
    try {
        const incidents = await Incident.find()
            .sort({ createdAt: -1 });

        res.json(incidents);

    } catch (error) {
        console.error("Error fetching incidents:", error);

        res.status(500).json({
            message: "Failed to fetch incidents"
        });
    }
});


// ==========================================
// GET USER INCIDENTS
// ==========================================
router.get("/user/:userId", async (req, res) => {
    try {
        const incidents = await Incident.find({
            userId: req.params.userId
        })
            .sort({ createdAt: -1 });

        res.json(incidents);

    } catch (error) {
        console.error("Error fetching user incidents:", error);

        res.status(500).json({
            message: "Failed to fetch user incidents"
        });
    }
});


// ==========================================
// GET NEARBY INCIDENTS (SMART MAP)
// ==========================================
router.get("/nearby", async (req, res) => {
    try {
        const {
            lng,
            lat,
            maxDistance = 5000
        } = req.query;

        if (!lng || !lat) {
            return res.status(400).json({
                message: "Longitude and latitude are required"
            });
        }

        const nearbyIncidents = await Incident.find({
            geoLoc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [
                            parseFloat(lng),
                            parseFloat(lat)
                        ]
                    },

                    $maxDistance: parseInt(maxDistance)
                }
            }
        });

        res.json(nearbyIncidents);

    } catch (error) {
        console.error(
            "Error fetching nearby incidents:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch nearby incidents"
        });
    }
});


// ==========================================
// UPDATE INCIDENT STATUS
// ==========================================
router.patch("/:id", async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message: "Status is required."
            });
        }

        const updatedIncident =
            await Incident.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

        if (!updatedIncident) {
            return res.status(404).json({
                message: "Incident not found."
            });
        }

        res.json({
            message: "Status updated successfully.",
            incident: updatedIncident
        });

    } catch (error) {
        console.error(
            "Error updating incident status:",
            error
        );

        res.status(500).json({
            message: "Failed to update status."
        });
    }
});


// ==========================================
// DELETE INCIDENT & MULTIPLE IMAGES
// ==========================================
router.delete("/:id", async (req, res) => {
    try {
        const incident =
            await Incident.findById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                message: "Incident not found."
            });
        }

        // Delete all associated Cloudinary images
        if (
            incident.imageUrls &&
            incident.imageUrls.length > 0
        ) {
            for (let url of incident.imageUrls) {

                const publicId = url
                    .split("/")
                    .slice(-2)
                    .join("/")
                    .split(".")[0];

                await cloudinary.uploader.destroy(
                    publicId
                );

                console.log(
                    `Image deleted from Cloudinary: ${publicId}`
                );
            }
        }

        await Incident.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "Incident and all associated photos deleted successfully."
        });

    } catch (error) {
        console.error(
            "Error deleting incident:",
            error
        );

        res.status(500).json({
            message: "Failed to delete incident."
        });
    }
});


// ==========================================
// SOS QUICK-TRIGGER
// SEND SMS TO ALL TRUSTED CONTACTS
// ==========================================

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


// ==========================================
// SEND SOS MESSAGE TO ALL CONTACTS
// ==========================================
const sendSOSMessage = async (
    latitude,
    longitude,
    userId
) => {
    try {

        // Get all trusted contacts of logged-in user
        const trustedContacts = await TrustedContact.find({
            userId: userId
        });

        if (trustedContacts.length === 0) {

            console.log(
                "No trusted contacts found."
            );

            return {
                success: false,
                sentCount: 0,
                totalContacts: 0,
                message:
                    "No trusted contacts found."
            };
        }


        // SOS message
        const messageBody =
            `🚨 EMERGENCY! I need immediate help.\n\n` +
            `My current location is:\n` +
            `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;


        let sentCount = 0;


        // Send SMS to every trusted contact
        for (const contact of trustedContacts) {

            let phoneNumber =
                contact.phone.replace(/\D/g, "");


            // Convert Indian 10-digit number
            // into +91XXXXXXXXXX
            if (phoneNumber.length === 10) {

                phoneNumber =
                    `+91${phoneNumber}`;

            } else if (
                !phoneNumber.startsWith("+")
            ) {

                phoneNumber =
                    `+${phoneNumber}`;
            }


            try {

                const message =
                    await twilioClient.messages.create({

                        body: messageBody,

                        from:
                            process.env.TWILIO_PHONE_NUMBER,

                        to: phoneNumber
                    });


                console.log(
                    `SMS SOS sent to ${contact.name}: ${message.sid}`
                );

                sentCount++;


            } catch (error) {

                console.error(
                    `Failed to send SMS to ${contact.name}:`,
                    error.message
                );
            }
        }


        return {

            success: sentCount > 0,

            sentCount,

            totalContacts:
                trustedContacts.length

        };


    } catch (error) {

        console.error(
            "SOS message error:",
            error.message
        );

        return {

            success: false,

            sentCount: 0,

            totalContacts: 0,

            message:
                "Failed to send SOS messages."
        };
    }
};


// ==========================================
// SOS API ROUTE
// ==========================================
router.post("/sos", protect, async (req, res) => {

    try {

        const {
            latitude,
            longitude
        } = req.body;


        if (
            latitude === undefined ||
            longitude === undefined
        ) {

            return res.status(400).json({

                message:
                    "Coordinates missing for SOS alert."

            });
        }


        console.log(
            `🚨 SOS ALERT TRIGGERED at Lat: ${latitude}, Lng: ${longitude}`
        );


        console.log(
            "Sending emergency SMS to trusted contacts..."
        );


        const result =
            await sendSOSMessage(
                latitude,
                longitude,
                req.user._id
            );


        if (!result.success) {

            return res.status(400).json({

                message:
                    result.message ||
                    "SOS triggered but SMS delivery failed."

            });
        }


        res.status(200).json({

            message:
                `SOS alert sent to ${result.sentCount} trusted contact(s).`,

            sentCount:
                result.sentCount,

            totalContacts:
                result.totalContacts,

            location: {

                latitude,

                longitude

            }

        });


    } catch (error) {

        console.error(
            "SOS Error:",
            error
        );


        res.status(500).json({

            message:
                "SOS trigger failed."

        });
    }
});


module.exports = router;