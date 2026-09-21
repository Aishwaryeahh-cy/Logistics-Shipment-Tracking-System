const Shipment = require("../models/Shipment");
const TrackingEvent = require("../models/TrackingEvent");

const getTrackingInfo = async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            $or: [
                { trackingNumber: req.params.trackingNumber },
                { trackingId: req.params.trackingNumber }
            ]
        });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Tracking number not found"
            });
        }

        const events = await TrackingEvent.find({
            $or: [
                { trackingNumber: shipment.trackingNumber },
                { shipmentId: shipment.trackingId }
            ]
        }).sort({ timestamp: 1, createdAt: 1 });

        res.status(200).json({
            success: true,
            data: {
                trackingNumber: shipment.trackingNumber || shipment.trackingId,
                trackingId: shipment.trackingId,
                status: shipment.currentStatus || shipment.status,
                currentLocation: shipment.currentLocation,
                origin: shipment.origin || shipment.sender?.city,
                destination: shipment.destination || shipment.receiver?.city,
                estimatedDelivery: shipment.estimatedDelivery || shipment.expectedDeliveryAt,
                events
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tracking information",
            error: error.message
        });
    }
};

const updateTrackingStatus = async (req, res) => {
    try {
        const {
            status,
            currentLocation,
            estimatedDelivery
        } = req.body;

        const shipment = await Shipment.findOne({
            $or: [
                { trackingNumber: req.params.trackingNumber },
                { trackingId: req.params.trackingNumber }
            ]
        });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Tracking number not found"
            });
        }

        if (status) {
            shipment.status = status;
            shipment.currentStatus = status;
        }

        if (currentLocation) {
            shipment.currentLocation = currentLocation;
        }

        if (estimatedDelivery) {
            shipment.estimatedDelivery = estimatedDelivery;
        }

        await shipment.save();

        if (status || currentLocation) {
            await TrackingEvent.create({
                shipment: shipment._id,
                shipmentId: shipment.trackingId,
                trackingNumber: shipment.trackingNumber,
                status: status || shipment.currentStatus || shipment.status,
                location: currentLocation || shipment.currentLocation,
                note: "Tracking information updated"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tracking information updated",
            data: shipment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update tracking information",
            error: error.message
        });
    }
};

module.exports = {
    getTrackingInfo,
    updateTrackingStatus
};
