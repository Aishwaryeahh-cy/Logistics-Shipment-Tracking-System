const fs = require("fs");
const path = require("path");

const shipmentsFile = path.join(__dirname, "../data/shipments.json");

// Read shipments from JSON file
const readShipments = () => {
    const data = fs.readFileSync(shipmentsFile, "utf-8");
    return JSON.parse(data);
};

// Write shipments to JSON file
const writeShipments = (shipments) => {
    fs.writeFileSync(
        shipmentsFile,
        JSON.stringify(shipments, null, 2)
    );
};


// CREATE SHIPMENT
const createShipment = (req, res) => {
    try {
        const shipments = readShipments();

        const {
            senderName,
            senderPhone,
            receiverName,
            receiverPhone,
            origin,
            destination,
            packageType,
            weight
        } = req.body;

        // Required field validation
        if (
            !senderName ||
            !receiverName ||
            !origin ||
            !destination
        ) {
            return res.status(400).json({
                success: false,
                message: "Required shipment details are missing"
            });
        }

        const shipment = {
            id: Date.now().toString(),

            trackingNumber: `LTS${Date.now()}`,

            senderName,
            senderPhone: senderPhone || "",

            receiverName,
            receiverPhone: receiverPhone || "",

            origin,
            destination,

            packageType: packageType || "General",

            weight: weight || 0,

            status: "Pending",

            currentLocation: origin,

            estimatedDelivery: null,

            createdAt: new Date().toISOString()
        };

        shipments.push(shipment);

        writeShipments(shipments);

        res.status(201).json({
            success: true,
            message: "Shipment created successfully",
            data: shipment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to create shipment",
            error: error.message
        });

    }
};


// GET ALL SHIPMENTS
const getShipments = (req, res) => {

    try {

        const shipments = readShipments();

        res.status(200).json({
            success: true,
            count: shipments.length,
            data: shipments
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch shipments",
            error: error.message
        });

    }
};


// GET SHIPMENT BY ID
const getShipmentById = (req, res) => {

    try {

        const shipments = readShipments();

        const shipment = shipments.find(
            item => item.id === req.params.id
        );

        if (!shipment) {

            return res.status(404).json({
                success: false,
                message: "Shipment not found"
            });

        }

        res.status(200).json({
            success: true,
            data: shipment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch shipment",
            error: error.message
        });

    }
};


// UPDATE SHIPMENT
const updateShipment = (req, res) => {

    try {

        const shipments = readShipments();

        const index = shipments.findIndex(
            item => item.id === req.params.id
        );

        if (index === -1) {

            return res.status(404).json({
                success: false,
                message: "Shipment not found"
            });

        }

        shipments[index] = {
            ...shipments[index],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        writeShipments(shipments);

        res.status(200).json({
            success: true,
            message: "Shipment updated successfully",
            data: shipments[index]
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to update shipment",
            error: error.message
        });

    }
};


// DELETE SHIPMENT
const deleteShipment = (req, res) => {

    try {

        const shipments = readShipments();

        const index = shipments.findIndex(
            item => item.id === req.params.id
        );

        if (index === -1) {

            return res.status(404).json({
                success: false,
                message: "Shipment not found"
            });

        }

        const deletedShipment = shipments[index];

        shipments.splice(index, 1);

        writeShipments(shipments);

        res.status(200).json({
            success: true,
            message: "Shipment deleted successfully",
            data: deletedShipment
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete shipment",
            error: error.message
        });

    }
};


module.exports = {
    createShipment,
    getShipments,
    getShipmentById,
    updateShipment,
    deleteShipment
};