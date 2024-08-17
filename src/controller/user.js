const { jwtToken } = require("../config/jwt");
const { User } = require("../model/user");
const asyncHandler = require("express-async-handler");

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password, confirmPassword, fullName } = req.body;

    // Validate passwords
    if (password !== confirmPassword) {
      throw new CustomError("Passwords do not match", 400);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new CustomError("User already exists", 400);
    }

    // Create new user
    const newUser = new User({ email, password, fullName });

    // Generate JWT token
    const token = jwtToken(newUser.user_id);

    // Save token to user
    newUser.token = token;

    // Save user to database
    const user = await newUser.save();

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully. Token jwtd for authentication.",
      token, // Include the JWT token in the response
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Login User
// Login User
const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatched(password))) {
      throw new CustomError("Incorrect email or password");
    }

    // jwt a new JWT token
    const jwtdToken = jwtToken(user._id);

    // Save the token to the user document in the database
    user.token = jwtdToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        fullName: user.lastName,
        email: user.email,
        token: jwtdToken,
        user_id: user.user_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Incorrect email or password",
    });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
