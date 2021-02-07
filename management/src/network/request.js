import axios from 'axios';
import host from './host';

axios.defaults.withCredentials = true;

export default function (config) {
  const instance = axios.create({
    baseURL: host,
    timeout: 5000
  });
  return instance(config);
}