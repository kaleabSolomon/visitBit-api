const express = require("express");
const connectDB = require("./config/connectDB");
const errorHandler = require("./middleware/errorHandler");
const buildingRoutes = require("./routes/buildingRoutes");
const dotenv = require("dotenv").config();

connectDB();
const app = express();

process.on("uncaughtException", (err) => {
  console.log("uncaught Exception");
  console.log(err.name, err.message);
  process.exit(1);
});
app.use(express.json());

app.use("/api/v1/buildings", buildingRoutes);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
