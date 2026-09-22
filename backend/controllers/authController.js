const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};


// ===============================
// REGISTER USER
// ===============================

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and password are required"

            });

        }

        const normalizedEmail =
            email.toLowerCase().trim();


        // Check if user already exists
        const existingUser =
            await User.findOne({
                email: normalizedEmail
            });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message:
                    "User with this email already exists"

            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 10);


        // Create user in MongoDB
        const user = await User.create({

            name,

            email: normalizedEmail,

            password: hashedPassword,

            role: "user"

        });


        // Generate token
        const token =
            generateToken(user);


        // Send response
        res.status(201).json({

            success: true,

            message:
                "User registered successfully",

            data: {

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email,

                    role: user.role

                },

                token

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Registration failed",

            error:
                error.message

        });

    }

};


// ===============================
// LOGIN USER
// ===============================

const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        // Check required fields
        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        const normalizedEmail =
            email.toLowerCase().trim();


        // Find user in MongoDB
        const user =
            await User.findOne({
                email: normalizedEmail
            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // Generate token
        const token =
            generateToken(user);


        res.status(200).json({

            success: true,

            message:
                "Login successful",

            data: {

                user: {

                    id: user._id,

                    name: user.name,

                    email: user.email,

                    role: user.role

                },

                token

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Login failed",

            error:
                error.message

        });

    }

};


// ===============================
// GET CURRENT USER
// ===============================

const getMe = async (req, res) => {

    try {

        // Find user using ID from JWT
        const user =
            await User.findById(req.user.id);


        if (!user) {

            return res.status(404).json({

                success: false,

                message:
                    "User not found"

            });

        }


        res.status(200).json({

            success: true,

            data: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to fetch user",

            error:
                error.message

        });

    }

};


module.exports = {

    register,

    login,

    getMe

};