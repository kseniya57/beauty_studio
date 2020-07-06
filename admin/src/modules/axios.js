import axios from 'axios';
import { API_URL } from '@/constants';

const instance = axios.create({
  baseURL: API_URL,
});

instance.defaults.headers.common.Accept = 'application/json';

export default instance;
