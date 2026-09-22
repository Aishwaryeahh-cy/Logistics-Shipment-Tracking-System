const Shipment = require("../models/Shipment");
const TrackingEvent = require("../models/TrackingEvent");


// GET TRACKING INFORMATION
const getTrackingInfo = async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            trackingNumber: req.params.trackingNumber
        });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Tracking number not found"
            });
        }

        const trackingEvents = await TrackingEvent.find({
            shipmentId: shipment._id
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            data: {
                trackingNumber: shipment.trackingNumber,
                status: shipment.status,
                currentLocation: shipment.currentLocation,
                origin: shipment.origin,
                destination: shipment.destination,
                estimatedDelivery: shipment.estimatedDelivery,
                trackingHistory: trackingEvents
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


// UPDATE TRACKING STATUS
const updateTrackingStatus = async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            trackingNumber: req.params.trackingNumber
        });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: "Tracking number not found"
            });
        }

        const {
            status,
            currentLocation,
            estimatedDelivery
        } = req.body;

        if (status) {
            shipment.status = status;
        }

        if (currentLocation) {
            shipment.currentLocation = currentLocation;
        }

        if (estimatedDelivery) {
            shipment.estimatedDelivery = estimatedDelivery;
        }

        await shipment.save();

        const trackingEvent = await TrackingEvent.create({
            shipmentId: shipment._id,
            status: shipment.status,
            location: shipment.currentLocation,
            description: `Shipment status updated to ${shipment.status}`
        });

        res.status(200).json({
            success: true,
            message: "Tracking information updated",
            data: {
                shipment,
                trackingEvent
            }
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