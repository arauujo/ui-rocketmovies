import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-rocketmovies-d0bv.onrender.com',
});
