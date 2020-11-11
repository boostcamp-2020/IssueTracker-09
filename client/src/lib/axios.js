import axios from 'axios';
import { SERVER_URL } from '../config';

axios.defaults.baseURL = `${SERVER_URL}/api`;
const request = async ({ method, params = '', data = '' }) => {
  const token = localStorage.getItem('jwt_token');

  const config = {
    method,
    url: `${params}`,
    headers: {
      Authorization: `bearer ${token}`,
    },
    data,
  };

  const result = await axios(config);
  return result;
};

export default request;
