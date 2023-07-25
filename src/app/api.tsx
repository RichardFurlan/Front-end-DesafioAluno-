import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7165/api', // Substitua pela URL da sua API
});

export default api;
