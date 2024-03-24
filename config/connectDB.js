const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB = process.env.DB_URL.replace(
      "<password>",
      process.env.DB_PASSWORD
    );
    await mongoose.connect(DB);
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = connectDB;
