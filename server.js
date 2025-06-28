 const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the contact page
app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Serve the thank you page
app.get('/thankyou.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

// Handle contact form submission
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Configure transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
         
    }
  });

  // Email content
  const mailOptions = {
    from: email,
    to:  process.env.EMAIL_USER,          // 🔴 Send to your email
    subject: `Contact Form: ${subject}`,
    text: `From: ${name} <${email}>\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect('/thankyou.html');
  } catch (err) {
    console.error('Email send error:', err);
    res.send(`<script>alert('Failed to send message.'); window.history.back();</script>`);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
