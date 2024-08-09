import axios from 'axios';

console.log('This is env', process.env.API_URL);

const instance = axios.create({
  baseURL: `${process.env.API_URL}`,
  headers: {
    post: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    get: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
  withCredentials: false,
});

export default instance;
