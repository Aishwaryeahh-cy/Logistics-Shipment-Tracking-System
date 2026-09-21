const mongoose = require("mongoose");
const Driver = require("../models/Driver");

const driverQuery = (id) => {
    const query = [
        { id },
        { driverCode: id }
    ];

    if (mongoose.Types.ObjectId.isValid(id)) {
        query.push({ _id: id });
    }

    return { $or: query };
};

const createDriver = async (req, res) => {
    try {
        const {
            name,
            phone,
            licenseNumber,
            vehicleNumber,
            vehicleType
        } = req.body;

        if (!name || !phone || !licenseNumber || !vehicleNumber) {
            return res.status(400).json({
                success: false,
                message: "Required driver details are missing"
            });
        }

        const driver = await Driver.create({
            id: Date.now().toString(),
            driverCode: `DRV${Date.now()}`,
            name,
            phone,
            licenseNumber,
            vehicleNumber,
            vehicleType: vehicleType || "Delivery Van",
            status: "Available",
            availability: "AVAILABLE"
        });

        res.status(201).json({
            success: true,
            message: "Driver created successfully",
            data: driver
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create driver",
            error: error.message
        });
    }
};

const getDrivers = async (_req, res) => {
    try {
        const drivers = await Driver.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: drivers.length,
            data: drivers
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch drivers",
            error: error.message
        });
    }
};

const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findOne(driverQuery(req.params.id));

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        res.status(200).json({
            success: true,
            data: driver
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch driver",
            error: error.message
        });
    }
};

const updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findOneAndUpdate(
            driverQuery(req.params.id),
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Driver updated successfully",
            data: driver
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update driver",
            error: error.message
        });
    }
};

const deleteDriver = async (req, res) => {
    try {
        const deletedDriver = await Driver.findOneAndDelete(
            driverQuery(req.params.id)
        );

        if (!deletedDriver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Driver deleted successfully",
            data: deletedDriver
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete driver",
            error: error.message
        });
    }
};

module.exports = {
    createDriver,
    getDrivers,
    getDriverById,
    updateDriver,
    deleteDriver
};
