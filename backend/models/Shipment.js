const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            index: true
        },
        trackingNumber: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
            trim: true
        },
        trackingId: {
            type: String,
            unique: true,
            sparse: true,
            index: true,
            trim: true
        },
        customerId: String,
        sender: {
            name: String,
            phone: String,
            email: String,
            address: String,
            city: String,
            state: String
        },
        receiver: {
            name: String,
            phone: String,
            email: String,
            address: String,
            city: String,
            state: String
        },
        package: {
            type: {
                type: String
            },
            weight: Number,
            description: String
        },
        senderName: {
            type: String,
            trim: true
        },
        senderPhone: {
            type: String,
            default: "",
            trim: true
        },
        receiverName: {
            type: String,
            required: true,
            trim: true
        },
        receiverPhone: {
            type: String,
            default: "",
            trim: true
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
            default: "General",
            trim: true
        },
        weight: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            default: "Pending",
            trim: true
        },
        currentLocation: {
            city: String,
            state: String,
            coordinates: {
                lat: Number,
                lng: Number
            },
            address: String
        },
        currentStatus: String,
        driverId: String,
        estimatedDelivery: {
            type: Date,
            default: null
        },
        expectedDeliveryAt: {
            type: Date,
            default: null
        },
        deliveredAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        id: false,
        toJSON: {
            transform: (_doc, ret) => {
                ret.id = ret.id || ret._id.toString();
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    }
);

module.exports = mongoose.model("Shipment", shipmentSchema, "shipments");
