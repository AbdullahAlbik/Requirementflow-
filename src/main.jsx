import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const showBootError = (error) => {
  const fallback = document.getElementById('boot-fallback');
  if (!fallback) return;

  fallback.style.display = 'block';
  const details = document.getElementById('boot-fallback-error');
  if (details) {
    details.textContent = error?.message || String(error);
    details.style.display = 'block';
  }
};

window.addEventListener('error', (event) => {
  showBootError(event.error || event.message);
});
window.addEventListener('unhandledrejection', (event) => {
  showBootError(event.reason);
});

import('./App.jsx')
  .then(({ default: App }) => {
    window.__REQFLOW_BOOTED__ = true;
    ReactDOM.createRoot(document.getElementById('root')).render(
      <App />
    );
  })
  .catch(showBootError);
