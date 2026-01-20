import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Add this
import App from "./app/App.tsx";
import './styles/tailwind.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Add this wrapper */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)