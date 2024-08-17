const jwt = require("jsonwebtoken");


// Define a function a JWT token
const jwtToken = (id) => {
  // Retrieve the secret key from environment variable
  const secretKey = '2345qwerty';
  const maxTime = 7 * 24 * 60 * 60; // Adjusted to 7 days (7 * 24 * 60 * 60 seconds)
  // jwt the JWT token
  return jwt.sign({ id }, secretKey, { expiresIn: maxTime });
};

module.exports = {
  jwtToken, // Export the function
};
