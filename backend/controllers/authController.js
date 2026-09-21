const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/User");

const publicUser = (user) => {
    const data = user.toJSON ? user.toJSON() : user;

    return {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
    };
};

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id || user._id.toString(),
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );
};

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            id: Date.now().toString(),
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: "CUSTOMER"
        });

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: publicUser(user),
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Registration failed",
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isHashedPassword = user.password.startsWith("$2");
        const passwordMatch = isHashedPassword
            ? await bcrypt.compare(password, user.password)
            : password === user.password;

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: publicUser(user),
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message
        });
    }
};

const getMe = async (req, res) => {
    try {
        const userQuery = [{ id: req.user.id }];

        if (mongoose.Types.ObjectId.isValid(req.user.id)) {
            userQuery.push({ _id: req.user.id });
        }

        const user = await User.findOne({
            $or: userQuery
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: publicUser(user)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getMe
};
