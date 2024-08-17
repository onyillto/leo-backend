const mongoose = require("mongoose");
const uuid = require("uuid");

const bookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    default: () => `Booking-${uuid.v4()}`,
    unique: true,
  },
  trip_id: {
    type: String,
    ref: "Trip",
    required: true,
  },
  user_id: {
    type: String,
    ref: "User",
    required: true,
  },
  isRoundTrip: {
    type: Boolean,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  payments: [
    {
      amount: {
        type: Number,
        required: true,
      },
      paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
      },
      paymentReference: {
        type: String,
        unique: true,
      },
      paymentDate: {
        type: Date,
      },
    },
  ],
  // Additional fields from populatedBookingData
  destination: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },
  terminal: {
    type: String,
    required: true,
  },
  time: {
    type: String, // Adjust according to your actual time field in the trip model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

// // Enable population of 'trip' when querying 'Booking'
// bookingSchema.virtual("trip", {
//   ref: "Trip",
//   localField: "trip_id",
//   foreignField: "_id",
//   justOne: true,
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// module.exports = Booking;
