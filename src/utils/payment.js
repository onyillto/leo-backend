const https = require("https");
const axios = require("axios");


 
class PaymentError extends Error {
  constructor(message) {
    super(message);
    this.name = "PaymentError";
  }
}

// Paystack configuration
const paystackConfig = {
  secretKey: "sk_test_404411a98099866d1972d924fea7d3503e83b9d0", // Replace with your actual key
};

const paystackHeaders = {
  Authorization: `Bearer ${paystackConfig.secretKey}`,
  "Content-Type": "application/json",
};

// Paystack payment endpoint
const paystackPaymentURL = "https://api.paystack.co/transaction/initialize";

// Function to initiate Paystack payment
const initiatePaystackPayment = async (email, amount) => {
  const response = await axios.post(
    paystackPaymentURL,
    { email, amount },
    { headers: paystackHeaders }
  );
  return response.data;
};

const paystackPayment = asyncHandler(async (req, res, next) => {
  try {
    const { email, amount } = req.body;

    // Call Paystack to initialize payment
    const paymentResponse = await initiatePaystackPayment(email, amount);

    if (paymentResponse.status && paymentResponse.data) {
      const { authorization_url, access_code, reference } =
        paymentResponse.data;

      res.status(200).json({
        success: true,
        message: "Authorization URL created",
        data: {
          authorization_url,
          access_code,
          reference,
        },
      });
    } else {
      next(new CustomError("Internal Server Error", 500));
    }
  } catch (error) {
    console.error("Error processing Paystack payment:", error);
    console.error(error.message); // Log the error message
    next(error);
  }
});

module.exports = pay