import axios from 'axios';

const API_URL = '/api/city';

export const fetchCityByTag = async (tag: string, isActive: boolean) => {
  const response = await axios.get(`${API_URL}/by-tag`, {
    headers: { Authorization: 'Bearer dGhlc2VjcmV0dG9rZW4=' },
    params: { tag, isActive },
  });
  return response.data;
};

export const calculateDistance = async (from: string, to: string) => {
  const response = await axios.get(`${API_URL}/distance`, {
    headers: { Authorization: 'Bearer dGhlc2VjcmV0dG9rZW4=' },
    params: { from, to },
  });
  return response.data;
};
