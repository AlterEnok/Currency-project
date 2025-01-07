import axios from 'axios';

const API_KEY = 'EKU3BnZJLIMMOb3OMPmOansugyG3orgc';
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

const mockData = {
  base: "USD",
  date: "2025-01-07",
  rates: {
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110.0
  }
};

export const getCurrencyRates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      headers: { apikey: API_KEY },
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error('Empty response received from the API.');
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message.includes('You have exceeded your daily/monthly API rate limit')) {
        console.error('API rate limit exceeded:', error.response.data.message);
        return mockData;
      }
    }

    console.error('Error fetching exchange rates:', error.message);
    throw error;
  }
};
