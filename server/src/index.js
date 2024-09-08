const express = require("express");
const cors = require("cors");
const axios = require("axios");

const port = 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getAllCurrencies", async (req, res) => {
  const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=024c330f85374f8f928f827d5621cbd1`;

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
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=024c330f85374f8f928f827d5621cbd1`;
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
