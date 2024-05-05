import express from "express";

const app = express();
const port = 3000;
const MONGODB_URI = "mongodb://localhost:27017/anttRobotics";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
