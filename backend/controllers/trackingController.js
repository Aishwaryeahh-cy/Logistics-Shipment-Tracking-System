const fs = require("fs");
const path = require("path");

const shipmentsFile = path.join(
    __dirname,
    "../data/shipments.json"
);


// Read shipments
const readShipments = () => {

    const data = fs.readFileSync(
        shipmentsFile,
        "utf-8"
    );

    return JSON.parse(data);

};


// Write shipments
const writeShipments = (shipments) => {

    fs.writeFileSync(
        shipmentsFile,
        JSON.stringify(shipments, null, 2)
    );

};


// GET TRACKING INFORMATION
const getTrackingInfo = (req, res) => {

    try {

        const shipments = readShipments();

        const shipment = shipments.find(
            item =>
                item.trackingNumber ===
                req.params.trackingNumber
        );


        if (!shipment) {

            return res.status(404).json({
                success: false,
                message: "Tracking number not found"
            });

        }


        res.status(200).json({

            success: true,

            data: {

                trackingNumber:
                    shipment.trackingNumber,

                status:
                    shipment.status,

                currentLocation:
                    shipment.currentLocation,

                origin:
                    shipment.origin,

                destination:
                    shipment.destination,

                estimatedDelivery:
                    shipment.estimatedDelivery

            }

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch tracking information",

            error:
                error.message

        });

    }

};


// UPDATE TRACKING STATUS
const updateTrackingStatus = (req, res) => {

    try {

        const shipments = readShipments();


        const index = shipments.findIndex(

            item =>
                item.trackingNumber ===
                req.params.trackingNumber

        );


        if (index === -1) {

            return res.status(404).json({

                success: false,

                message:
                    "Tracking number not found"

            });

        }


        const {
            status,
            currentLocation,
            estimatedDelivery
        } = req.body;


        if (status) {

            shipments[index].status = status;

        }


        if (currentLocation) {

            shipments[index].currentLocation =
                currentLocation;

        }


        if (estimatedDelivery) {

            shipments[index].estimatedDelivery =
                estimatedDelivery;

        }


        shipments[index].updatedAt =
            new Date().toISOString();


        writeShipments(shipments);


        res.status(200).json({

            success: true,

            message:
                "Tracking information updated",

            data:
                shipments[index]

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to update tracking information",

            error:
                error.message

        });

    }

};


module.exports = {

    getTrackingInfo,

    updateTrackingStatus

};