import axios from 'axios'

export const Mail = axios.create({
  baseURL: 'https://api.staticforms.xyz',
  headers: { 'Content-Type': 'application/json' }
})
