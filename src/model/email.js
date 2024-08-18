const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  activity: [
    {
      status: {
        type: String,
        enum: ["active", "non-active"], // Ensures that only these values are allowed
        default: "active", // Default value for status
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Email = mongoose.model("Email", emailSchema);

module.exports = { Email };
