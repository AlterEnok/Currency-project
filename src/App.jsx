import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CurrencyChart from './components/CurrencyChart';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRateTable from './components/ExchangeRateTable';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setAuthModalOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  return (
    <Router>
      <div>
        <NavigationBar
          isAuthenticated={isAuthenticated}
          onLogin={openAuthModal}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<ExchangeRateTable />} />
          <Route path="/converter" element={<CurrencyConverter />} />
          <Route path="/charts" element={<CurrencyChart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
