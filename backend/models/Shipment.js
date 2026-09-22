const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
    {
        trackingNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        senderName: {
            type: String,
            required: true,
            trim: true
        },

        senderPhone: {
            type: String,
            default: ""
        },

        receiverName: {
            type: String,
            required: true,
            trim: true
        },

        receiverPhone: {
            type: String,
            default: ""
        },

        origin: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        packageType: {
            type: String,
            default: "General"
        },

        weight: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            default: "Pending"
        },

        currentLocation: {
            type: String,
            default: ""
        },

        estimatedDelivery: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Shipment", shipmentSchema);