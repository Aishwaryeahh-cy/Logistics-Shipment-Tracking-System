const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const driverRoutes = require("./routes/driverRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.use(express.json());


// Home route
app.get("/", (req, res) => {

    res.json({
        message: "Logistics Tracking API is running"
    });

});


// API routes
app.use("/api/auth", authRoutes);

app.use("/api/shipments", shipmentRoutes);

app.use("/api/tracking", trackingRoutes);

app.use("/api/drivers", driverRoutes);


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
