import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import express from "express";

const app = express();
const port = 3000;
const MONGODB_URI = "mongodb://localhost:27017/anttRobotics";

app.use(express.json());
app.use("/api/v1", userRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
