// frontend/src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://mybackend-alumnet.azurewebsites.net/',
});

export default instance;
