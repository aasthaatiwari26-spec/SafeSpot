const express = require("express");
const TrustedContact = require("../models/TrustedContact");
// NAYA: Auth middleware import kiya (Tera folder path verify kar lena)
const protect = require("../middleware/authMiddleware"); 
const router = express.Router();

// 1. GET: Fetch all contacts for logged-in user
// NAYA: Route ko '/' kar diya aur 'protect' laga diya
router.get("/", protect, async (req, res) => {
    try {
        // userId ab frontend se nahi, seedha token (req.user._id) se aayega
        const contacts = await TrustedContact.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts" });
    }
});

// 2. POST: Add a new trusted contact
// NAYA: 'protect' middleware add kiya
router.post("/", protect, async (req, res) => {
    try {
        const { name, phone, relation } = req.body; // userId yahan se hata diya
        
        // NAYA: req.user._id ka use kiya jo protect middleware deta hai
        const newContact = new TrustedContact({ 
            userId: req.user._id, 
            name, 
            phone, 
            relation 
        });
        
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: "Error adding contact" });
    }
});

// 3. DELETE: Remove a contact
router.delete("/:id", protect, async (req, res) => {
    try {
        await TrustedContact.findByIdAndDelete(req.params.id);
        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact" });
    }
});

module.exports = router;