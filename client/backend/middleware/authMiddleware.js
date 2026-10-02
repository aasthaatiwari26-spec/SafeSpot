const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Dhyan rakhna, tere User model ka path yahi hona chahiye

const protect = async (req, res, next) => {
    let token;

    // Check karo ki header mein authorization 'Bearer token' ke format mein aaya hai ya nahi
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            // "Bearer <token>" string se sirf token extract karo
            token = req.headers.authorization.split(" ")[1];

            // Token ko verify karo apni .env file ke JWT_SECRET se
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Token se user ID nikalo aur database se wo user dhoondh lo (password field chhod kar)
            req.user = await User.findById(decoded.id).select("-password");

            // Agar sab theek hai toh next() call karke agle function/route par jao
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // Agar header mein token mila hi nahi
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

module.exports = protect;