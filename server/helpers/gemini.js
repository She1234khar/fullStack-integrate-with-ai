const axios = require('axios');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function askGemini(prompt) {
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };
  try {
    const response = await axios.post(GEMINI_URL, body);
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No answer found.";
  } catch (err) {
    console.error('Gemini API error:', err?.response?.data || err.message);
    throw err;
  }
}

module.exports = { askGemini };