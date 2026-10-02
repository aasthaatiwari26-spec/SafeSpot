require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const trustedContactRoutes = require("./routes/trustedContactRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const journeyRoutes = require("./routes/journeyRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());


// Create HTTP server
const server = http.createServer(app);


// Socket.IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


// Socket connection
io.on("connection", (socket) => {

    console.log(
        "⚡ User connected to SafeSpot Live Map:",
        socket.id
    );

    socket.on("disconnect", () => {
        console.log(
            "User disconnected:",
            socket.id
        );
    });

});


// Make Socket.IO available in routes
app.use((req, res, next) => {
    req.io = io;
    next();
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/incidents", incidentRoutes);

app.use("/api/trusted-contacts", trustedContactRoutes);

app.use("/api/evidence", evidenceRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/journeys", journeyRoutes);


// Home / Test route
app.get("/", (req, res) => {
    res.send("SafeSpot Backend is running!");
});


// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});