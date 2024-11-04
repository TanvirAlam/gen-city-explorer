import axios from 'axios';

const API_URL = '/api/city';
const API_Bearer = 'Bearer dGhlc2VjcmV0dG9rZW4=';

export const fetchCityByTag = async (tag: string, isActive: boolean) => {
  const response = await axios.get(`${API_URL}/by-tag`, {
    headers: { Authorization: API_Bearer },
    params: { tag, isActive },
  });
  return response.data;
};

export const calculateDistance = async (from: string, to: string) => {
  const response = await axios.get(`${API_URL}/distance`, {
    headers: { Authorization: API_Bearer },
    params: { from, to },
  });
  return response.data;
};

export const fetchArea = async (from: string, distance: number) => {
  const response = await axios.get(`${API_URL}/area`, {
    headers: { Authorization: API_Bearer },
    params: { from, distance },
  });
  return response.data;
};

export const fetchAreaResult = async (url: string) => {
  const response = await axios.get(url, {
    headers: { Authorization: API_Bearer },
  });
  return response;
};
