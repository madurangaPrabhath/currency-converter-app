const axios = require("axios");

const API_KEY = process.env.OPENEXCHANGE_API_KEY;
const BASE_URL = "https://openexchangerates.org/api";

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;

  if (!sourceCurrency || !targetCurrency || !amountInSourceCurrency) {
    return res.status(400).json({
      message:
        "Please provide sourceCurrency, targetCurrency, and amountInSourceCurrency",
    });
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    let endpoint = `${BASE_URL}/latest.json`;

    if (date && date !== today) {
      const requestedDate = new Date(date);
      const currentDate = new Date();

      if (requestedDate > currentDate) {
        return res.status(400).json({
          message: "Cannot retrieve exchange rates for future dates",
        });
      }
      endpoint = `${BASE_URL}/historical/${date}.json`;
    }

    const response = await axios.get(endpoint, {
      params: {
        app_id: API_KEY,
      },
    });

    const rates = response.data.rates;

    if (!rates[sourceCurrency] || !rates[targetCurrency]) {
      return res.status(400).json({
        message: "Invalid currency code",
      });
    }

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const convertedAmount = (amountInSourceCurrency / sourceRate) * targetRate;

    return res.status(200).json(convertedAmount.toFixed(2));
  } catch (error) {
    console.error("Error converting currency:", error.message);
    return res.status(500).json({
      message: error.response?.data?.message || "Error converting currency",
    });
  }
};
