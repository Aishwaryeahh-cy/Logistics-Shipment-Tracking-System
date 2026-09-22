const express = require("express");

const {
    getTrackingInfo,
    updateTrackingStatus
} = require("../controllers/trackingController");

const router = express.Router();


// Get tracking information
router.get(
    "/:trackingNumber",
    getTrackingInfo
);


// Update tracking information
router.put(
    "/:trackingNumber/status",
    updateTrackingStatus
);


module.exports = router;