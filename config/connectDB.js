const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.DB_URL.replace(
      "<password>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(DB);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("connected to database");
});
mongoose.connection.on("error", (err) => {
  console.log("error while connecting to database" + err);
});
mongoose.connection.on("disconnected", () => {
  console.log("disconnected from database");
});

module.exports = connectDB;
