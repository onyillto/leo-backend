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
  activity: {
    type: [
      {
        status: {
          type: Boolean,
          enum: ["active", "non-active"],
          default: "active",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    default: [
      {
        status: "active",
        date: Date.now(),
      },
    ],
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = { Email };
