const express = require("express");

const {
    createShipment,
    getShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
} = require("../controllers/shipmentController");

const router = express.Router();


// Create shipment
router.post("/", createShipment);


// Get all shipments
router.get("/", getShipments);


// Get shipment by ID
router.get("/:id", getShipmentById);


// Update shipment
router.put("/:id", updateShipment);


// Delete shipment
router.delete("/:id", deleteShipment);


module.exports = router;