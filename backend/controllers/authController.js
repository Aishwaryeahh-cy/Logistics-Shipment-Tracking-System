const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const usersFile = path.join(
    __dirname,
    "../data/users.json"
);


// Read users from JSON file
const readUsers = () => {

    const data = fs.readFileSync(
        usersFile,
        "utf-8"
    );

    return JSON.parse(data);

};


// Write users to JSON file
const writeUsers = (users) => {

    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 2)
    );

};


// Generate JWT token
const generateToken = (user) => {

    return jwt.sign(

        {
            id: user.id,
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

        const users = readUsers();


        const {
            name,
            email,
            password
        } = req.body;


        // Check required fields
        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and password are required"

            });

        }


        // Check if user already exists
        const existingUser = users.find(

            user =>
                user.email.toLowerCase() ===
                email.toLowerCase()

        );


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


        // Create user
        const user = {

            id: Date.now().toString(),

            name,

            email: email.toLowerCase(),

            password: hashedPassword,

            role: "user",

            createdAt:
                new Date().toISOString()

        };


        // Save user
        users.push(user);

        writeUsers(users);


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

                    id: user.id,

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

        const users = readUsers();


        const {
            email,
            password
        } = req.body;


        // Check required fields
        if (
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // Find user
        const user = users.find(

            item =>
                item.email.toLowerCase() ===
                email.toLowerCase()

        );


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

                    id: user.id,

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

const getMe = (req, res) => {

    try {

        const users = readUsers();


        const user = users.find(

            item =>
                item.id === req.user.id

        );


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

                id: user.id,

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