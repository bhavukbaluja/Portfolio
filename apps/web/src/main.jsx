import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ✅ Inject Razorpay script globally (once)
const razorpayScript = document.createElement('script');
razorpayScript.src = 'https://checkout.razorpay.com/v1/checkout.js';
razorpayScript.async = true;
document.body.appendChild(razorpayScript);

// ✅ Render your App
createRoot(document.getElementById('root')).render(
  <App />
);
