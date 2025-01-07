import React, { useState, useEffect } from 'react';
import { getCurrencyRates } from '../services/currencyService';
import '../styles/ExchangeRateTable.css';

const ExchangeRateTable = () => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await getCurrencyRates();
        setRates(data.rates);
        setLoading(false);
      } catch (error) {
        console.error('Помилка при отриманні курсів валют:', error);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <p>Завантаження курсів валют...</p>;
  }

  return (
    <div className="exchange-rate-container">
      <h2 className="exchange-rate-title">Курси валют</h2>
      <div className="exchange-rate-table-container">
        <table className="exchange-rate-table">
          <thead>
            <tr>
              <th>Валюта</th>
              <th>Курс (відносно USD)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rates).map(([currency, rate]) => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rate.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExchangeRateTable;
