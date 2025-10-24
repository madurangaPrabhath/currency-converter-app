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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-cyan-600/20"></div>
      
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Main content */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-violet-500/50">
            <span className="text-3xl">💱</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Currency Converter
          </h1>
          <p className="text-slate-400 text-sm">
            Convert currencies with real-time rates
          </p>
        </div>

        {/* Converter Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Date */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                📅 Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                required
              />
            </div>

            {/* From Currency */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                💰 From
              </label>
              <div className="flex gap-3">
                <select
                  value={sourceCurrency}
                  onChange={(e) => setSourceCurrency(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer transition-all"
                  required
                >
                  <option value="">Currency</option>
                  {Object.keys(currencyNames).map((currency) => (
                    <option key={currency} value={currency} className="bg-slate-800">
                      {currency}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amountInSourceCurrency}
                  onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                  step="0.01"
                  placeholder="Amount"
                  className="w-32 px-4 py-3 bg-slate-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwapCurrencies}
                className="p-3 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg shadow-violet-500/30"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-2">
                💵 To
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer transition-all"
                required
              >
                <option value="">Select Currency</option>
                {Object.keys(currencyNames).map((currency) => (
                  <option key={currency} value={currency} className="bg-slate-800">
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            {/* Convert Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Result */}
          {amountInTargetCurrency > 0 && amountInSourceCurrency && (
            <div className="mt-6 p-5 bg-gradient-to-br from-violet-900/30 to-cyan-900/30 rounded-2xl backdrop-blur-sm">
              <div className="text-center">
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">Result</p>
                <div className="text-4xl font-bold text-white mb-1">
                  {amountInTargetCurrency}
                </div>
                <div className="text-cyan-400 font-semibold text-lg mb-3">{targetCurrency}</div>
                <div className="text-slate-400 text-sm">
                  {amountInSourceCurrency} {sourceCurrency} = {amountInTargetCurrency} {targetCurrency}
                </div>
                <div className="text-slate-500 text-xs mt-2">
                  {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          Powered by OpenExchangeRates
        </div>
      </div>
    </div>
  );
}
