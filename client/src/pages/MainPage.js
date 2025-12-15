import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? "/api" : "http://localhost:8080");

export default function MainPage() {
  const getYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  };

  const [date, setDate] = useState(getYesterday());
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState("");
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_URL}/convert`, {
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
      setError(
        error.response?.data?.message ||
          "Failed to convert currency. Please try again."
      );
      setAmountInTargetCurrency(0);
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
        const response = await axios.get(`${API_URL}/getAllCurrencies`);
        setCurrencyNames(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center mb-3 sm:mb-4 lg:mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
              <div className="relative bg-white p-3 sm:p-4 rounded-full shadow-2xl">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">
            Currency Exchange
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 max-w-sm sm:max-w-md md:max-w-lg mx-auto px-2 sm:px-4">
            Real-time currency conversion at your fingertips
          </p>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <div className="bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-cyan-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Convert Currency
                </h2>
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 sm:space-y-4"
                >
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="flex items-center text-xs sm:text-sm lg:text-base font-semibold text-white">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-xl sm:rounded-2xl border-2 border-white/30 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 outline-none text-xs sm:text-sm lg:text-base"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="flex items-center text-xs sm:text-sm lg:text-base font-semibold text-white">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      From
                    </label>
                    <div className="space-y-2">
                      <select
                        value={sourceCurrency}
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl border-2 border-white/30 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 outline-none cursor-pointer text-xs sm:text-sm lg:text-base appearance-none bg-no-repeat bg-[length:20px] bg-[position:right_0.75rem_center] pr-10"
                        style={{
                          backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')`,
                        }}
                        required
                      >
                        <option value="" className="bg-gray-800">
                          Choose currency
                        </option>
                        {Object.keys(currencyNames).map((currency) => (
                          <option
                            key={currency}
                            value={currency}
                            className="bg-gray-800"
                          >
                            {currency} - {currencyNames[currency]}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        value={amountInSourceCurrency}
                        onChange={(e) =>
                          setAmountInSourceCurrency(e.target.value)
                        }
                        step="0.01"
                        placeholder="Enter amount"
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 rounded-xl sm:rounded-2xl border-2 border-white/30 focus:border-green-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 outline-none text-xs sm:text-sm lg:text-base text-center font-semibold text-2xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-center -my-1 sm:-my-1.5">
                    <button
                      type="button"
                      onClick={handleSwapCurrencies}
                      className="group relative p-2.5 sm:p-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 transition-all duration-300"
                      aria-label="Swap currencies"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="flex items-center text-xs sm:text-sm lg:text-base font-semibold text-white">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      To
                    </label>
                    <select
                      value={targetCurrency}
                      onChange={(e) => setTargetCurrency(e.target.value)}
                      className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl sm:rounded-2xl border-2 border-white/30 focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 outline-none cursor-pointer text-xs sm:text-sm lg:text-base appearance-none bg-no-repeat bg-[length:20px] bg-[position:right_0.75rem_center] pr-10"
                      style={{
                        backgroundImage: `url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')`,
                      }}
                      required
                    >
                      <option value="" className="bg-gray-800">
                        Choose currency
                      </option>
                      {Object.keys(currencyNames).map((currency) => (
                        <option
                          key={currency}
                          value={currency}
                          className="bg-gray-800"
                        >
                          {currency} - {currencyNames[currency]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white text-sm sm:text-base lg:text-lg font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          <span>Converting...</span>
                        </>
                      ) : (
                        <>
                          <span>Convert Now</span>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                </form>
              </div>
            </div>

            <div>
              {amountInTargetCurrency > 0 &&
                amountInSourceCurrency &&
                !error && (
                  <div className="bg-white/10 backdrop-blur-2xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl border border-white/20 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 animate-fade-in">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
                      <svg
                        className="w-6 h-6 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Conversion Result
                    </h2>
                    <div className="text-center space-y-4">
                      <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/30">
                        <p className="text-xs sm:text-sm text-gray-300 uppercase tracking-widest mb-3 font-semibold">
                          Converted Amount
                        </p>
                        <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-lg">
                          {parseFloat(amountInTargetCurrency).toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}
                        </div>
                        <div className="text-xl sm:text-2xl font-bold text-cyan-300 mb-4">
                          {targetCurrency}
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-200">
                          <span className="font-semibold">
                            {parseFloat(
                              amountInSourceCurrency
                            ).toLocaleString()}{" "}
                            {sourceCurrency}
                          </span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                          <span className="font-semibold">
                            {parseFloat(
                              amountInTargetCurrency
                            ).toLocaleString()}{" "}
                            {targetCurrency}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              {error && (
                <div className="bg-red-500/20 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 border border-red-500/30 animate-fade-in">
                  <div className="flex items-center gap-3 text-red-200">
                    <svg
                      className="w-6 h-6 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-semibold mb-1">Conversion Error</h3>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-4 sm:mt-5 md:mt-6 lg:mt-8 space-y-2">
          <p className="text-xs sm:text-sm text-white/80 font-medium">
            Developed by{" "}
            <a
              href="https://madurangaprabhath.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 transition-colors"
            >
              Maduranga Prabhath
            </a>
          </p>
          <p className="text-xs sm:text-sm text-white/60 flex items-center justify-center gap-2">
            <svg
              className="w-3.5 h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Powered by OpenExchangeRates
          </p>
        </div>
      </div>
    </div>
  );
}
