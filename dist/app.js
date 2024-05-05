"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const MONGODB_URI = "mongodb://localhost:27017/anttRobotics";
app.use(express_1.default.json());
app.use("/api/v1", userRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
