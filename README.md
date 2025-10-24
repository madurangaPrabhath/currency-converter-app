# 💱 Currency Converter

A modern, professional currency converter application with real-time exchange rates. Built with React and Express, featuring a stunning violet-cyan gradient design.

![Currency Converter](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)
![Express](https://img.shields.io/badge/Express-4.19.2-000000?style=for-the-badge&logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.10-38bdf8?style=for-the-badge&logo=tailwindcss)

## ✨ Features

- 🌍 **Real-time Exchange Rates** - Get accurate currency conversion using OpenExchangeRates API
- 💰 **200+ Currencies** - Support for all major world currencies
- 📅 **Historical Rates** - Convert based on specific dates
- 🔄 **Quick Swap** - Instantly swap between source and target currencies
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight** - Optimized performance with minimal dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/madurangaPrabhath/currency-converter-app.git
   cd currency-converter-app
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd server
   npm start
   ```

   The server will run on `http://localhost:8080`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   The app will open at `http://localhost:3000`

## 🛠️ Tech Stack

### Frontend

- **React** - UI library for building interactive interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

### Backend

- **Express.js** - Fast, minimalist web framework
- **Node.js** - JavaScript runtime
- **Axios** - HTTP client for external API integration
- **CORS** - Cross-Origin Resource Sharing middleware

### API

- **OpenExchangeRates** - Real-time and historical exchange rate data

## 📁 Project Structure

```
currency-converter-app/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   │   ├── index.html
│   │   ├── favicon.svg
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   │   └── MainPage.js    # Main converter component
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css          # Global styles
│   ├── package.json
│   └── tailwind.config.js
│
└── server/                 # Backend Express server
    ├── src/
    │   └── index.js           # Server & API routes
    └── package.json
```

## 🎨 Design Features

- **Dark Theme** - Easy on the eyes with slate-950 background
- **Gradient Accents** - Beautiful violet-to-cyan gradients
- **Grid Pattern Background** - Subtle depth and texture
- **Glassmorphism** - Modern frosted glass effects
- **Smooth Animations** - Fade-in and slide-up transitions
- **Custom Scrollbar** - Themed scrollbar matching the design
- **Focus Rings** - Clear visual feedback on interactions

## 🔧 Configuration

### API Key Setup (Optional)

The app uses OpenExchangeRates API. For production use, you may want to:

1. Sign up at [OpenExchangeRates](https://openexchangerates.org/)
2. Get your API key
3. Update the API endpoint in `server/src/index.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌟 Key Components

### MainPage.js

The main currency converter component featuring:

- Date selection for historical rates
- Source currency selection with amount input
- Target currency selection
- Swap functionality
- Real-time conversion display

### Server API Endpoints

- `GET /getAllCurrencies` - Fetch all available currencies
- `GET /convert` - Convert currency with parameters:
  - `date` - Conversion date (YYYY-MM-DD)
  - `sourceCurrency` - Source currency code
  - `targetCurrency` - Target currency code
  - `amountInSourceCurrency` - Amount to convert

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Maduranga Prabhath**

- GitHub: [@madurangaPrabhath](https://github.com/madurangaPrabhath)

## 🙏 Acknowledgments

- [OpenExchangeRates](https://openexchangerates.org/) for providing the currency data API
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [React](https://react.dev/) for the powerful UI library

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

<div align="center">
  Made with by Maduranga Prabhath
</div>
