const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            index: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["CUSTOMER", "OPERATIONS", "DRIVER", "user", "admin", "operations"],
            default: "CUSTOMER"
        },
        phone: {
            type: String,
            default: "",
            trim: true
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

module.exports = mongoose.model("User", userSchema, "users");
