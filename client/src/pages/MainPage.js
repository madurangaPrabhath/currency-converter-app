import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MainPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState("");
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setSourceCurrency(targetCurrency);
    setTargetCurrency(sourceCurrency);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl mb-6 shadow-xl">
            <span className="text-5xl text-white">¤</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Currency Converter
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Get real-time exchange rates and convert currencies instantly. 
            Perfect for travelers, shoppers, and international business.
          </p>
        </div>

        {/* Main converter card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-700/50 animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date picker */}
              <div className="group">
                <label className="block text-gray-200 text-sm font-semibold mb-2 transition-all group-focus-within:text-cyan-400">
                  📅 Date
                </label>
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  value={date}
                  className="w-full px-4 py-3.5 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                  required
                />
              </div>

              {/* Currency inputs section */}
              <div className="space-y-4">
                {/* Source currency */}
                <div className="group">
                  <label className="block text-gray-200 text-sm font-semibold mb-2 transition-all group-focus-within:text-cyan-400">
                    💰 From
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    <div className="col-span-3">
                      <select
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        value={sourceCurrency}
                        className="w-full px-4 py-3.5 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70 appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-gray-800">Select currency</option>
                        {Object.keys(currencyNames).map((currency) => (
                          <option className="bg-gray-800" key={currency} value={currency}>
                            {currency} - {currencyNames[currency]}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <input
                        onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                        type="number"
                        value={amountInSourceCurrency}
                        step="0.01"
                        className="w-full px-4 py-3.5 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Swap button */}
                <div className="flex justify-center -my-2">
                  <button
                    type="button"
                    onClick={handleSwapCurrencies}
                    className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white hover:from-cyan-600 hover:to-teal-600 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </button>
                </div>

                {/* Target currency */}
                <div className="group">
                  <label className="block text-gray-200 text-sm font-semibold mb-2 transition-all group-focus-within:text-cyan-400">
                    💵 To
                  </label>
                  <select
                    onChange={(e) => setTargetCurrency(e.target.value)}
                    value={targetCurrency}
                    className="w-full px-4 py-3.5 bg-gray-700/50 backdrop-blur-sm border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/70 appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-gray-800">Select currency</option>
                    {Object.keys(currencyNames).map((currency) => (
                      <option className="bg-gray-800" key={currency} value={currency}>
                        {currency} - {currencyNames[currency]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Convert button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-cyan-600 hover:to-teal-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </span>
                ) : (
                  "Convert Currency"
                )}
              </button>
            </form>

            {/* Result display */}
            {amountInTargetCurrency > 0 && amountInSourceCurrency && (
              <div className="mt-8 p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl border border-cyan-500/30 animate-fade-in">
                <div className="text-center">
                  <p className="text-gray-300 text-sm mb-2">Converted Amount</p>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {amountInTargetCurrency} <span className="text-2xl text-cyan-400">{targetCurrency}</span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {amountInSourceCurrency} {sourceCurrency} = {amountInTargetCurrency} {targetCurrency}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    Rate as of {new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="text-center mt-8 text-gray-400 text-sm">
            <p>Powered by OpenExchangeRates • Real-time currency data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
