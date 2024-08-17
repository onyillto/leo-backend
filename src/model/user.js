// Import Mongoose
const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: () => `User-${uuid.v4()}`, // Using a function to concatenate prefix and UUID
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  token: {
    type: String,
  },

  passwordChangeAt: Date,
  verificationTokenExpires: Number,
  passwordResetExpires: Date,
});

//Encrypt incoming registered password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Decrypt Database paswword for incoming password from registered User
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.createVerificationToken = async function () {
  // Generate a random 4-digit token
  const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();

  // Set the verification token and expiration time in the user document
  this.verificationTokenExpires = verificationToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expires in 10 minutes
  // Return the generated verification token
  return verificationToken;
};
// Create and export models

const User = mongoose.model("User", userSchema);

module.exports = { User };
