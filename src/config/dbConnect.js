const mongoose = require("mongoose");
const DbString = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(DbString);
    console.log("Trying to connect to her heart...");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

module.exports = dbConnect;
