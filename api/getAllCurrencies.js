const axios = require("axios");

const API_KEY = process.env.OPENEXCHANGE_API_KEY;

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/currencies.json?app_id=${API_KEY}`
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching currencies:", error.message);
    return res.status(500).json({
      message: error.response?.data?.message || "Error fetching currencies",
    });
  }
};
