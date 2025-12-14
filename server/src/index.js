const express = require("express");
const cors = require("cors");
const axios = require("axios");

const port = process.env.PORT || 8080;
const API_KEY =
  process.env.OPENEXCHANGE_API_KEY || "e02546f30b924ceb80d0cc4d2411ea0a";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.get("/getAllCurrencies", async (req, res) => {
  const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=${API_KEY}`;

  try {
    const nameResponse = await axios.get(nameURL);
    const nameData = nameResponse.data;
    return res.json(nameData);
  } catch (error) {
    console.error(error);
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=${API_KEY}`;
    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;
    const sourceRates = rates[sourceCurrency];
    const targetRates = rates[targetCurrency];
    const targetAmount = (targetRates / sourceRates) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

// Export for Vercel serverless
module.exports = app;
