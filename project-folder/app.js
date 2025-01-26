// app.js

const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables

// Import routes
const emailRoutes = require("./routes/emailRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Mount email-related routes
app.use("/api/emails", emailRoutes);

// Mount OAuth authentication routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
