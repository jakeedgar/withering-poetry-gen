import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login/';
import PoemPage from './pages/Poem';
import AboutPage from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/poems" element={<PoemPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
