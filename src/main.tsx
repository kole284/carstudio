// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ OVO je ispravno za React 18+
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

