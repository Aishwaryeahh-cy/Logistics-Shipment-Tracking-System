const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        licenseNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        vehicleType: {
            type: String,
            default: "Delivery Van"
        },

        status: {
            type: String,
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Driver", driverSchema);