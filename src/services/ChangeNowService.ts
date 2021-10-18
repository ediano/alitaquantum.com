import axios from 'axios'

export const changeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2',
  headers: {
    'Content-Type': 'application/json',
    'x-changenow-api-key': process.env.NEXT_PUBLIC_CHANGENOW_API_KEY as string
  }
})
