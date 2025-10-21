# 🚀 Quick Start Guide

Get the Strategic Trade Intelligence Platform running in 5 minutes!

## Step 1: Prerequisites Check ✅

Open your terminal (PowerShell, Command Prompt, or Terminal) and verify:

```bash
node --version
```

**Required**: v18.0.0 or higher

```bash
npm --version
```

**Required**: v9.0.0 or higher

> **Don't have Node.js?** Download it from [nodejs.org](https://nodejs.org/)

---

## Step 2: Install Dependencies 📦

Navigate to the project directory and run:

```bash
npm install
```

This will install:

- React 18.3.1 (UI Framework)
- TypeScript 5.7.2 (Type Safety)
- Vite 6.0.1 (Build Tool)
- TailwindCSS 3.4.15 (Styling)
- Recharts 2.15.2 (Data Visualization)
- And 20+ other carefully selected packages

**Expected time**: 1-3 minutes depending on your internet connection.

---

## Step 3: Start Development Server 🎯

```bash
npm run dev
```

You should see output like:

```
  VITE v6.0.1  ready in 450 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

---

## Step 4: Open in Browser 🌐

Open your browser and navigate to:

**http://localhost:5173**

You should see the Strategic Trade Intelligence Platform with:

- Professional navy blue header
- Sidebar with 9 analysis modules
- Platform Overview as the default view

---

## 🎉 Success!

You're now running the platform locally. Try navigating through the different modules:

1. **Platform Overview** - Start here for an introduction
2. **Forecasting Engine** - View trade forecasts with multiple models
3. **Sentiment Lag Model** - Analyze market sentiment
4. **Supply Chain Vulnerability** - Risk assessment dashboard
5. **Regional Substitution** - Alternative sourcing analysis
6. **Regulatory Tracker** - Policy monitoring
7. **Policy Events Timeline** - Historical context
8. **Futures Market** - Market sentiment indicators
9. **Shock Simulation** - Interactive scenario builder

---

## Common Issues & Solutions 🔧

### Issue: "npm: command not found"

**Solution**: Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: Port 5173 already in use

**Solution**: Vite will automatically use the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

### Issue: Module not found errors

**Solution**:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Slow installation

**Solution**: Try using a different npm registry:

```bash
npm install --registry=https://registry.npmjs.org/
```

---

## Next Steps 📚

### For Development:

- Edit components in `src/components/`
- Modify styles in `src/styles/globals.css`
- Hot Module Replacement (HMR) is enabled - changes appear instantly!

### For Production:

```bash
npm run build
npm run preview
```

### Code Quality:

```bash
npm run lint
```

---

## Project Commands Reference 📝

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm install`     | Install all dependencies |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint checks        |

---

## Need Help? 💬

- Check the main [README.md](./README.md) for detailed documentation
- Review the project structure in the README
- Contact Stochron Technologies for support

---

**Happy Coding! 🎨✨**
