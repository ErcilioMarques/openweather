import axios from 'axios';
import Variables from './variables';

export default axios.create({
  baseURL: Variables.API_URL
});