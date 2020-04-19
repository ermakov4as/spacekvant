import axios from 'axios'
import router from './router'
import User from '@/models/User'

const API_URL = 'https://cloud-api.yandex.net/v1/'

// Стандартный HTTP запрос
export const HTTP = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `OAuth ${User.oauthToken}`
  }
})

// HTTP запрос для загрузки файла
export const HTTP_UPLOAD = axios.create({
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
})

// Действия при ошибки авторизации
HTTP.interceptors.response.use(null, function(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    console.log(`Failed to login (error: ${error.response.status})`)
    router.push('/login');
  }
  return Promise.reject(error)
});