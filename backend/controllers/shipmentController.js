const mongoose = require("mongoose");
const Shipment = require("../models/Shipment");

const shipmentQuery = (id) => {
    const query = [
        { id },
        { trackingId: id },
        { trackingNumber: id }
    ];

    if (mongoose.Types.ObjectId.isValid(id)) {
        query.push({ _id: id });
    }

    return { $or: query };
};

const createShipment = async (req, res) => {
    try {
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

        if (!senderName || !receiverName || !origin || !destination) {
            return res.status(400).json({
                success: false,
                message: "Required shipment details are missing"
            });
        }

        const timestamp = Date.now();
        const shipment = await Shipment.create({
            id: Date.now().toString(),
            trackingNumber: `LTS${timestamp}`,
            trackingId: `SHP${timestamp}`,
            sender: {
                name: senderName,
                phone: senderPhone || "",
                city: origin
            },
            receiver: {
                name: receiverName,
                phone: receiverPhone || "",
                city: destination
            },
            package: {
                type: packageType || "General",
                weight: weight || 0
            },
            senderName,
            senderPhone: senderPhone || "",
            receiverName,
            receiverPhone: receiverPhone || "",
            origin,
            destination,
            packageType: packageType || "General",
            weight: weight || 0,
            status: "Pending",
            currentStatus: "ORDER_CREATED",
            currentLocation: {
                city: origin
            },
            estimatedDelivery: null
        });

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

const getShipments = async (_req, res) => {
    try {
        const shipments = await Shipment.find().sort({ createdAt: -1 });

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

const getShipmentById = async (req, res) => {
    try {
        const shipment = await Shipment.findOne(
            shipmentQuery(req.params.id)
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

const updateShipment = async (req, res) => {
    try {
        const shipment = await Shipment.findOneAndUpdate(
            shipmentQuery(req.params.id),
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Shipment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Shipment updated successfully",
            data: shipment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update shipment",
            error: error.message
        });
    }
};

const deleteShipment = async (req, res) => {
    try {
        const deletedShipment = await Shipment.findOneAndDelete(
            shipmentQuery(req.params.id)
        );

        if (!deletedShipment) {
            return res.status(404).json({
                success: false,
                message: "Shipment not found"
            });
        }

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
