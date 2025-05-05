const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const imageRoutes = require('./routes/image');
require('dotenv').config(); // Load from .env

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));

let generatedOtp = null;
let otpEmail = null;

// ✅ Create transporter using App Password from .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ✅ Send OTP to user's email
app.post('/api/send-otp', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send('Email required');

  generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  otpEmail = email;

  const mailOptions = {
    from: `"SecureVote" <${process.env.EMAIL_USER}>`, // must match transporter user
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${generatedOtp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('Failed to send OTP');
    }
    res.send('OTP sent');
  });
});

// ✅ Verify OTP submitted by user
app.post('/api/verify-otp', (req, res) => {
  const { otp, email } = req.body;
  if (email === otpEmail && otp === generatedOtp) {
    res.send({ verified: true });
  } else {
    res.send({ verified: false });
  }
});

// ✅ Upload image route
app.use('/api/image', imageRoutes);

app.listen(3001, () => {
  console.log('✅ Server running on http://localhost:3001');
});
