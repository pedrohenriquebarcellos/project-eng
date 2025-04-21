import axios from "axios";
import 'dotenv/config'

export const api = axios.create({
    baseURL: 'http://localhost:5000'
})

export const cnpjApi = axios.create({
    baseURL: 'https://publica.cnpj.ws'
})