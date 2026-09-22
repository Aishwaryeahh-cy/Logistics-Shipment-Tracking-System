const Driver = require("../models/Driver");


// CREATE DRIVER
const createDriver = async (req, res) => {
    try {
        const {
            name,
            phone,
            licenseNumber,
            vehicleNumber,
            vehicleType
        } = req.body;

        if (
            !name ||
            !phone ||
            !licenseNumber ||
            !vehicleNumber
        ) {
            return res.status(400).json({
                success: false,
                message: "Required driver details are missing"
            });
        }

        const existingDriver = await Driver.findOne({
            $or: [
                { licenseNumber },
                { vehicleNumber }
            ]
        });

        if (existingDriver) {
            return res.status(400).json({
                success: false,
                message: "License number or vehicle number already exists"
            });
        }

        const driver = await Driver.create({
            name,
            phone,
            licenseNumber,
            vehicleNumber,
            vehicleType: vehicleType || "Delivery Van",
            status: "Available"
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


// GET ALL DRIVERS
const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();

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


// GET DRIVER BY ID
const getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id);

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


// UPDATE DRIVER
const updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(
            req.params.id,
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


// DELETE DRIVER
const deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);

        if (!driver) {
            return res.status(404).json({
                success: false,
                message: "Driver not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Driver deleted successfully",
            data: driver
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