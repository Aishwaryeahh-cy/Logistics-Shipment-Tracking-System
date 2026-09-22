const express = require("express");

const {
    createDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
} = require("../controllers/driverController");

const router = express.Router();


// Create driver
router.post("/", createDriver);


// Get all drivers
router.get("/", getDrivers);


// Get driver by ID
router.get("/:id", getDriverById);


// Update driver
router.put("/:id", updateDriver);


// Delete driver
router.delete("/:id", deleteDriver);


module.exports = router;