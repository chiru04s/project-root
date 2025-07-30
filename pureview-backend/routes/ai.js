// routes/ai.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ✅ Ensure GEMINI_API_KEY is set
if (!process.env.GEMINI_API_KEY) {
  throw new Error("🚨 GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🤖 Ask AI Route
router.post('/ask', async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || question.trim().length === 0) {
    return res.status(400).json({ error: "❌ No valid question provided" });
  }

  try {
    console.log("🧠 Asking Gemini:", question);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent([
      "You are an expert in food, skincare, and cosmetic ingredients. Explain clearly to a beginner if a substance is harmful, beneficial, or neutral based on common knowledge.",
      question
    ]);

    const response = await result.response;
    const answer = response.text();

    if (!answer) {
      return res.status(500).json({ error: "⚠️ Gemini gave no response" });
    }

    console.log("✅ Gemini response:", answer);
    res.json({ answer });

  } catch (error) {
    console.error("❌ Gemini API error:", error?.message || error);
    res.status(500).json({ error: "Gemini failed to respond" });
  }
});

module.exports = router;
