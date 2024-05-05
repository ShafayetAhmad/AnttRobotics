"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const userSchema = new mongoose_1.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ["in-progress", "approved", "suspended"],
        required: true,
    },
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    phone: { type: String, required: true, unique: true },
    occupation: { type: String },
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        enum: ["male", "female", "prefer-not-answer"],
        required: true,
    },
    photoUrl: { type: String },
    addresses: [
        {
            isDeleted: { type: Boolean, default: false },
            address: {
                street: { type: String },
                city: { type: String },
                prefecture: { type: String },
                postalCode: { type: String },
                country: { type: String },
                buildingName: { type: String },
                roomNumber: { type: String },
                state: { type: String },
                details: { type: String },
            },
        },
    ],
}, { timestamps: true });
userSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("User", userSchema);
