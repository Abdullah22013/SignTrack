import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App; 