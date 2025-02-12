import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = async (name, email, password) => {
  return axios.post(`${API_URL}/auth/signup`, { name, email, password });
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const getUserAppointments = async () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/appointments`, {
    headers: { Authorization: token },
  });
};
