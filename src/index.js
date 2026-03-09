import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Polyfill for window.storage if not available
if (!window.storage) {
  const store = {};
  window.storage = {
    async get(key) {
      if (key in store) return { key, value: store[key] };
      const v = localStorage.getItem(key);
      if (v !== null) return { key, value: v };
      throw new Error('Key not found');
    },
    async set(key, value) {
      store[key] = value;
      localStorage.setItem(key, value);
      return { key, value };
    },
    async delete(key) {
      delete store[key];
      localStorage.removeItem(key);
      return { key, deleted: true };
    },
    async list(prefix) {
      const keys = Object.keys(localStorage).filter(k => !prefix || k.startsWith(prefix));
      return { keys };
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
