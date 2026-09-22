const mongoose = require("mongoose");

const trackingEventSchema = new mongoose.Schema(
    {
        shipmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shipment",
            required: true
        },

        status: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("TrackingEvent", trackingEventSchema);