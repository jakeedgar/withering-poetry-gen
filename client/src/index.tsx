import * as React from 'react';
import ReactDOM from 'react-dom/client';
import 'dotenv/config';
import App from './App';
import './assets/css/dots.css';
import './assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
