import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
import { useNavigate } from 'react-router-dom';

// Проверим в самом начале, есть ли токен в хранилище
const JWTToken = localStorage.getItem('token');
const BASE_URL = 'https://localhost:7134';

// Создать инстанс axios
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export function apiSetHeader(name, value) {
  if (value) {
    api.defaults.headers[name] = value;
  }
}

// Если токен есть, то добавим заголовок к запросам
if (JWTToken) {
  apiSetHeader('Authorization', JWTToken);
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = '/auth';
    }
  }
);

export default api;
