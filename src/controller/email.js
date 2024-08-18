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

const postEmail = asyncHandler(async (req, res, next) => {
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


// Handler to toggle email status
const updateStatus = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body; // Expecting `active` status to be passed in the request body

    if (typeof active !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Active status must be a boolean.',
      });
    }

    const email = await Email.findById(id);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email not found.',
      });
    }

    // Update the last activity status
    email.activity.push({
      status: active ? 'active' : 'non-active',
      date: new Date(),
    });

    await email.save();

    res.status(200).json({
      success: true,
      message: 'Email status updated successfully.',
      data: email,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = {
  postEmail,
  allemails,
  deleteEmail,
  updateStatus,
};
