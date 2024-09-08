import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState(null);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });
      setAmountInTargetCurrency(response.data);
      console.log(amountInSourceCurrency, amountInTargetCurrency);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/getAllCurrencies"
        );
        setCurrencyNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-yellow-500 text-center">
        Convert Your Currency
      </h1>
      <p className="lg:mx-32 opacity-40 py-6">
        Welcome to "Currency Convertor", Your Currency makes currency conversion
        quick and easy. Get real-time exchange rates, support for multiple
        currencies, and a user-friendly interface all at your fingertips.
        Perfect for travelers and online shoppers alike!
      </p>

      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor={date}
                class="block mb-2 text-sm font-medium dark:text-white"
              >
                Date
              </label>
              <input
                onChange={(e) => setDate(e.target.value)}
                type="Date"
                id={date}
                name={date}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor={sourceCurrency}
                class="block mb-2 text-sm font-medium dark:text-white"
              >
                Source Currency
              </label>
              <select
                onChange={(e) => setSourceCurrency(e.target.value)}
                id={sourceCurrency}
                name={sourceCurrency}
                value={sourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select a source currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor={targetCurrency}
                class="block mb-2 text-sm font-medium dark:text-white"
              >
                Target Currency
              </label>
              <select
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={targetCurrency}
                name={targetCurrency}
                value={targetCurrency}
              >
                <option value="">Select a target currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option className="p-1" key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-5">
              <label
                htmlFor={amountInSourceCurrency}
                class="block mb-2 text-sm font-medium dark:text-white"
              >
                Amount in source currency
              </label>
              <input
                onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                type="number"
                id={amountInSourceCurrency}
                name={amountInSourceCurrency}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Amount in source currency"
                required
              />
            </div>

            <button className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Get the target Currency
            </button>
          </form>
        </section>
      </div>
      <section className="lg:mx-72 mt-5 text-xl">
        {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {" "}
        <span className="text-yellow-500 font-bold">{" "}{amountInTargetCurrency}{" "}</span> in {currencyNames[targetCurrency]}
      </section>
    </div>
  );
}
