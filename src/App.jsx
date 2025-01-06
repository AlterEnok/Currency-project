import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRateTable from './components/ExchangeRateTable';
import CurrencyChart from './components/CurrencyChart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExchangeRateTable />} />
        <Route path="/converter" element={<CurrencyConverter />} />
        <Route path="/charts" element={<CurrencyChart />} />
      </Routes>
    </Router>
  );
};

export default App;
