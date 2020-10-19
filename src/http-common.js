import axios from 'axios'
import router from './router'
import User from '@/models/User'

const API_URL = 'https://cloud-api.yandex.net/v1/'

// Стандартные HTTP запросы
export const HTTP_AERO = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `OAuth ${User.oauthTokenAero}` // TODO:
  }
})
export const HTTP_SPACE = axios.create({
  baseURL: API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `OAuth ${User.oauthTokenSpace}` // TODO:
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
HTTP_AERO.interceptors.response.use(null, function(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    console.log(`Failed to login (error: ${error.response.status})`)
    router.push('/login');
  }
  return Promise.reject(error)
});
HTTP_SPACE.interceptors.response.use(null, function(error) {
  if (error.response.status === 401 || error.response.status === 403) {
    console.log(`Failed to login (error: ${error.response.status})`)
    router.push('/login');
  }
  return Promise.reject(error)
});