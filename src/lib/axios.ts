import axios from "axios";

export const api = axios.create({
    //baseURL: 'https://projeto-eng-api.onrender.com'
    baseURL: 'http://localhost:5000'
})

export const cnpjApi = axios.create({
    baseURL: 'https://publica.cnpj.ws'
})