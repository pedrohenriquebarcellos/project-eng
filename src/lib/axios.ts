import axios from "axios";
import { toast } from "react-toastify"

export const api = axios.create({
    //baseURL: 'https://projeto-eng-api.onrender.com'
    baseURL: 'http://localhost:5000'
})

export const cnpjApi = axios.create({
    baseURL: 'https://publica.cnpj.ws'
})

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        toast.error('Você precisa estar logado para acessar essa funcionalidade.')
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
  
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
  
      return Promise.reject(error)
    }
  )