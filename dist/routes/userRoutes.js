"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const createUserSchema = joi_1.default.object({
    uid: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    role: joi_1.default.string().required(),
    status: joi_1.default.string().valid("in-progress", "approved", "suspended").required(),
    name: joi_1.default.object({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
    }),
    phone: joi_1.default.string().required(),
    occupation: joi_1.default.string(),
    dateOfBirth: joi_1.default.date().required(),
    gender: joi_1.default.string().valid("male", "female", "prefer-not-answer").required(),
    photoUrl: joi_1.default.string(),
    addresses: joi_1.default.array().items(joi_1.default.object({
        isDeleted: joi_1.default.boolean().default(false),
        address: joi_1.default.object({
            street: joi_1.default.string().required(),
            city: joi_1.default.string().required(),
            prefecture: joi_1.default.string().required(),
            postalCode: joi_1.default.string().required(),
            country: joi_1.default.string().required(),
            buildingName: joi_1.default.string().required(),
            roomNumber: joi_1.default.string().required(),
            state: joi_1.default.string(),
            details: joi_1.default.string(),
        }),
    })),
});
router.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const newUser = req.body;
        const createdUser = yield User_1.default.create(newUser);
        return res.status(201).json(createdUser);
    }
    catch (error) {
        console.log("Error creating user: ", error);
        return res.status(500).send("Internal Server Error");
    }
}));
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Get all users");
}));
exports.default = router;
