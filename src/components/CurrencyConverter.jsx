import React, { useState, useEffect } from 'react';
import { getCurrencyRates } from '../services/currencyService';
import '../styles/CurrencyConverter.css';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencyRates();
        setCurrencies(Object.keys(data.rates));
        setFromCurrency(Object.keys(data.rates)[0]);
        setToCurrency(Object.keys(data.rates)[1] || 'EUR');
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const data = await getCurrencyRates();
      const rate = data.rates[toCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <div className="converter-container">
      <h2 className="converter-title">Конвертер валют</h2>
      <div className="converter-form">
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          className="converter-input"
        />
        <select
          value={fromCurrency}
          onChange={e => setFromCurrency(e.target.value)}
          className="converter-select"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span className="converter-arrow">➡</span>
        <select
          value={toCurrency}
          onChange={e => setToCurrency(e.target.value)}
          className="converter-select"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button
          onClick={handleConvert}
          className="converter-button"
        >
          Конвертировать
        </button>
      </div>
      {convertedAmount !== null && (
        <p className="converter-result">
          {amount} {fromCurrency} = <strong>{convertedAmount.toFixed(2)} {toCurrency}</strong>
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
