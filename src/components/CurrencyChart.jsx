import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getCurrencyRates } from '../services/currencyService';
import Select from 'react-select';
import '../styles/CurrencyChart.css';

const CurrencyChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('');
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        setLoading(true); // Начало загрузки
        const data = await getCurrencyRates();
        const baseCurrency = data.base;
        setBaseCurrency(baseCurrency);

        const availableCurrencies = Object.keys(data.rates);
        setCurrencies(availableCurrencies);

        const historicalRates = await getCurrencyRates();
        const formattedData = Object.entries(historicalRates.rates).map(([date, rate]) => ({
          date,
          ...selectedCurrencies.reduce((acc, currency) => {
            acc[currency] = rate[currency] || 0;
            return acc;
          }, {}),
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching currency data:', error);
      } finally {
        setLoading(false); // Завершение загрузки
      }
    };

    fetchCurrencyData();
  }, [selectedCurrencies]);

  const handleCurrencySelection = (selectedOptions) => {
    setSelectedCurrencies(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const seriesData = selectedCurrencies.map(currency => ({
    name: currency,
    data: chartData.map(data => data[currency] || 0),
  }));

  const options = {
    xAxis: {
      categories: chartData.map(data => data.date),
    },
    yAxis: {},
    series: seriesData,
  };

  if (loading) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <div className="chart-container">
      <h2 className="chart-title">Графік валют</h2>

      <div className="chart-select-container">
        <Select
          isMulti
          options={currencies.map(currency => ({ value: currency, label: currency }))}
          value={selectedCurrencies.map(currency => ({ value: currency, label: currency }))}
          onChange={handleCurrencySelection}
          placeholder="Оберіть валюти"
          styles={{
            control: (base) => ({
              ...base,
              width: '300px',
              marginRight: '10px',
            }),
          }}
        />
      </div>

      <div className="chart-wrapper">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default CurrencyChart;
