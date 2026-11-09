const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const destinationRoutes = require("./routes/destinationRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Destiny Travels API");
});

// Destination routes
app.use("/api/destinations", destinationRoutes);

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});