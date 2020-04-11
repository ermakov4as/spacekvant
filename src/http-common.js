import axios from 'axios'
import router from './router'
import User from '@/models/User'

const API_URL = 'https://cloud-api.yandex.net/v1/';

// Стандартный HTTP запрос
export const HTTP = axios.create({
    baseURL: API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `OAuth ${User.oauthToken}`
    }
});

// Стандартный HTTP запрос для загрузки
/* export const HTTP_UPLOAD = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${store.getters.token}`
    }
}); */

// Проверка авторизации при HTTP запросе
/* HTTP.interceptors.request.use(
    function(config) {
        const token = store.getters.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        };
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
); */

// Действия при ошибки авторизации
HTTP.interceptors.response.use(null, function(error) {
    if (error.response.status === 401 || error.response.status === 403) {
        console.log(`Failed to login (error: ${error.response.status})`);
        router.push('/login');
    };
    return Promise.reject(error)
});