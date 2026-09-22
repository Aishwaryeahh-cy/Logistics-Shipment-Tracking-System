const Shipment = require("../models/Shipment");
const TrackingEvent = require("../models/TrackingEvent");


// CREATE SHIPMENT
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


        // Generate tracking number
        const trackingNumber =
            `LTS${Date.now()}`;


        // Create shipment in MongoDB
        const shipment = await Shipment.create({

            trackingNumber,

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

            estimatedDelivery: null

        });
        await TrackingEvent.create({
    shipmentId: shipment._id,
    status: shipment.status,
    location: shipment.currentLocation,
    description: "Shipment created"
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


// GET ALL SHIPMENTS
const getShipments = async (req, res) => {

    try {

        const shipments =
            await Shipment.find();

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
const getShipmentById = async (req, res) => {

    try {

        const shipment =
            await Shipment.findById(req.params.id);


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
const updateShipment = async (req, res) => {

    try {

        const shipment =
            await Shipment.findByIdAndUpdate(

                req.params.id,

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


// DELETE SHIPMENT
const deleteShipment = async (req, res) => {

    try {

        const shipment =
            await Shipment.findByIdAndDelete(
                req.params.id
            );


        if (!shipment) {

            return res.status(404).json({

                success: false,

                message: "Shipment not found"

            });

        }


        res.status(200).json({

            success: true,

            message: "Shipment deleted successfully",

            data: shipment

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