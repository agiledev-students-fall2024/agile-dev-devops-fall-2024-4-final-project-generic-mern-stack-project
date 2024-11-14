// otpSender.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP email function
async function sendOTPEmail(receiverEmail) {
  const otp = generateOTP();

  // Configure Nodemailer with your email provider
  const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Define email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiverEmail,
    subject: 'Your OTP Code',
    text: `Your one-time password (OTP) is: ${otp}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${receiverEmail}`);
    return otp; // Return OTP if needed for verification
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

// Example usage
sendOTPEmail('receiver@example.com')
  .then((otp) => console.log(`Generated OTP: ${otp}`))
  .catch(console.error);

module.exports = sendOTPEmail;
