const fs = require("fs");
const path = require("path");

const driversFile = path.join(
    __dirname,
    "../data/drivers.json"
);


// Read drivers
const readDrivers = () => {

    const data = fs.readFileSync(
        driversFile,
        "utf-8"
    );

    return JSON.parse(data);

};


// Write drivers
const writeDrivers = (drivers) => {

    fs.writeFileSync(
        driversFile,
        JSON.stringify(drivers, null, 2)
    );

};


// CREATE DRIVER
const createDriver = (req, res) => {

    try {

        const drivers = readDrivers();

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

                message:
                    "Required driver details are missing"

            });

        }


        const driver = {

            id: Date.now().toString(),

            name,

            phone,

            licenseNumber,

            vehicleNumber,

            vehicleType:
                vehicleType || "Delivery Van",

            status: "Available",

            createdAt:
                new Date().toISOString()

        };


        drivers.push(driver);

        writeDrivers(drivers);


        res.status(201).json({

            success: true,

            message:
                "Driver created successfully",

            data: driver

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to create driver",

            error:
                error.message

        });

    }

};


// GET ALL DRIVERS
const getDrivers = (req, res) => {

    try {

        const drivers = readDrivers();


        res.status(200).json({

            success: true,

            count: drivers.length,

            data: drivers

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch drivers",

            error:
                error.message

        });

    }

};


// GET DRIVER BY ID
const getDriverById = (req, res) => {

    try {

        const drivers = readDrivers();


        const driver = drivers.find(

            item =>
                item.id === req.params.id

        );


        if (!driver) {

            return res.status(404).json({

                success: false,

                message:
                    "Driver not found"

            });

        }


        res.status(200).json({

            success: true,

            data: driver

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch driver",

            error:
                error.message

        });

    }

};


// UPDATE DRIVER
const updateDriver = (req, res) => {

    try {

        const drivers = readDrivers();


        const index = drivers.findIndex(

            item =>
                item.id === req.params.id

        );


        if (index === -1) {

            return res.status(404).json({

                success: false,

                message:
                    "Driver not found"

            });

        }


        drivers[index] = {

            ...drivers[index],

            ...req.body,

            updatedAt:
                new Date().toISOString()

        };


        writeDrivers(drivers);


        res.status(200).json({

            success: true,

            message:
                "Driver updated successfully",

            data:
                drivers[index]

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to update driver",

            error:
                error.message

        });

    }

};


// DELETE DRIVER
const deleteDriver = (req, res) => {

    try {

        const drivers = readDrivers();


        const index = drivers.findIndex(

            item =>
                item.id === req.params.id

        );


        if (index === -1) {

            return res.status(404).json({

                success: false,

                message:
                    "Driver not found"

            });

        }


        const deletedDriver =
            drivers[index];


        drivers.splice(index, 1);


        writeDrivers(drivers);


        res.status(200).json({

            success: true,

            message:
                "Driver deleted successfully",

            data:
                deletedDriver

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to delete driver",

            error:
                error.message

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