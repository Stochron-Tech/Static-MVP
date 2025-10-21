# Static-MVP

**Strategic Trade Intelligence Platform**  
The first MVP developed by Stochron Technologies. A comprehensive geopolitical risk analysis platform for US-China Soybean Export Analysis.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.15-cyan)

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

To verify your installation:

```bash
node --version
npm --version
```

### Installation

1. **Clone the repository** (if not already done):

   ```bash
   git clone https://github.com/Stochron-Tech/Static-MVP.git
   cd Static-MVP
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

   This will install all required packages including React, TypeScript, Vite, TailwindCSS, Recharts, and other dependencies.

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will start at `http://localhost:5173` (default Vite port).

4. **Open in browser**:
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

### Build for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📋 Features

This platform includes 9 comprehensive analysis modules:

1. **Platform Overview** - Introduction to the intelligence system
2. **Forecasting Engine** - ARIMA, SARIMA, and GARCH models for trade predictions
3. **Sentiment Lag Model** - Market sentiment analysis and correlation tracking
4. **Supply Chain Vulnerability** - Real-time vulnerability scoring and risk assessment
5. **Regional Substitution** - Alternative sourcing and supply chain diversification
6. **Regulatory Tracker** - Policy and regulatory change monitoring
7. **Policy Events Timeline** - Historical trade events and their impacts
8. **Futures Market Analysis** - Commodity futures and market sentiment
9. **Shock Simulation Engine** - Interactive scenario modeling with drag-and-drop interface

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.0.1
- **Styling**: TailwindCSS 3.4.15 with custom design tokens
- **Charts**: Recharts 2.15.2
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Drag & Drop**: React DnD 16.0.1

## 📁 Project Structure

```
Static-MVP/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── figma/           # Figma-generated components
│   │   └── *.tsx            # Feature components
│   ├── styles/
│   │   └── globals.css      # Global styles and CSS variables
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies

```

## 🎨 Design System

The platform uses a professional consulting-inspired design system:

- **Primary Color**: Navy Blue (#003d5c) - McKinsey-inspired professional palette
- **Typography**: Clean, modern sans-serif hierarchy
- **Charts**: Professional 5-color scheme optimized for data visualization
- **Dark Mode**: Full dark mode support with custom theme switching

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality checks

## 🤝 Contributing

This is a proprietary project by Stochron Technologies. For collaboration inquiries, please contact the development team.

## 📄 License

MIT License - Copyright (c) 2025 Stochron Technologies

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual URL.

### Dependencies Installation Issues

```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

Ensure you're using Node.js version 18 or higher:

```bash
node --version
```

## 📞 Support

For issues or questions, please create an issue in the GitHub repository or contact Stochron Technologies.

---

**Built with ❤️ by Stochron Technologies**
