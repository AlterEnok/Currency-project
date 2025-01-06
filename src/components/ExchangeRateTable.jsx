import React, { useState, useEffect } from 'react';
import { getCurrencyRates } from '../services/currencyService';
import NavigationBar from './NavigationBar';
import '../styles/ExchangeRateTable.css'; // Импортируем стили

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
    return (
      <div>
        <NavigationBar />
        <p>Завантаження курсів валют...</p>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
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
              {Object.entries(rates).map(([currency, rate], index) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rate.toFixed(6)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateTable;
