const express = require("express");
const connectDB = require("./config/connectDB");
const { errorHandler } = require("./middleware/errorHandlers");
const { handleInvalidRequestBody } = require("./middleware/errorHandlers");
const buildingRoutes = require("./routes/buildingRoutes");
const wifiSpotRoutes = require("./routes/wifiSpotRoutes");
const restroomRoutes = require("./routes/restroomRoutes");
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
app.use("/api/v1/wifiSpots", wifiSpotRoutes);
app.use("/api/v1/restrooms", restroomRoutes);
app.use(handleInvalidRequestBody);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
