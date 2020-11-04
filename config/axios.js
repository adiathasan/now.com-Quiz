import Axios from 'axios';

export const instanceAxios = Axios.create({
  baseURL: '/api',
});

export const instanceAxiosDummyApi = Axios.create({
  baseURL: 'https://reqres.in/api',
});
