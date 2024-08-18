const { User } = require("../model/user");
const Booking = require("../model/bookings");
const { Email } = require("../model/email");
const axios = require("axios");
const asyncHandler = require("express-async-handler");

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

const postEmal = asyncHandler(async (req, res, next) => {
  try {
    // Get the email data from the request body
    const emailData = req.body;

    // Check if email data is provided
    if (!emailData || !emailData.email) {
      return res.status(400).json({
        success: false,
        message: "Email data is required to subscribe.",
      });
    }

    // Create email entry with the provided data
    const email = await Email.create(emailData);

    // Send success response
    res.status(201).json({
      success: true,
      message: "Email sent successfully",
      data: email,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


const allemails = asyncHandler(async (req, res, next) => {
  try {
    const emails = await Email.find();
    res.status(201).json({
      success: true,
      message: "emails retrieved successfully",
      data: emails,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});



const deleteEmail = asyncHandler(async (req, res, next) => {
  try {
    const emailId = req.params.id; // Get the email ID from request parameters

    // Find and delete the email
    const deletedEmail = await Email.findByIdAndDelete(emailId);

    if (!deletedEmail) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email deleted successfully",
      data: deletedEmail,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


const updateStatus = asyncHandler(async (req, res) => {
  const { email, status } = req.body;

  // Validate the status value
  if (!["active", "non-active"].includes(status)) {
    return res
      .status(400)
      .json({
        message: "Invalid status value. Must be 'active' or 'non-active'.",
      });
  }

  try {
    // Find the email document
    const emailDoc = await Email.findOne({ email });

    if (!emailDoc) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Add the new status to the activity array
    emailDoc.activity.push({ status });

    // Save the updated document
    await emailDoc.save();

    res
      .status(200)
      .json({ message: `Status changed to ${status}.`, email: emailDoc });
  } catch (error) {
    console.error("Error toggling status:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = {
  postEmal,
  allemails,
  deleteEmail,
  updateStatus,
};
