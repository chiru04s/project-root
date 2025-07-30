const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact"); // Mongoose model

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newMessage = new Contact({ name, email, message }); // ✅ fixed line
    await newMessage.save();
    res.status(201).json({ msg: "Thanks! Your message has been received." });
  } catch (err) {
    console.error("Contact form error:", err);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
