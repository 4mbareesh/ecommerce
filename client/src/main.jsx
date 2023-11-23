import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-multi-carousel/lib/styles.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { SearchProvider } from './context/searchContext.jsx'
import { CartProvider } from './context/cartContext.jsx'
import 'antd/dist/reset.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
)
