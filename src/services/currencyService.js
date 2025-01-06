import axios from 'axios';

const API_KEY = 'EKU3BnZJLIMMOb3OMPmOansugyG3orgc';
const BASE_URL = 'https://api.apilayer.com/exchangerates_data';

export const getCurrencyRates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/latest`, {
      headers: { apikey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};
