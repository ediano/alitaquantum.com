import axios from 'axios'

export const changeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2',
  headers: {
    'x-changenow-api-key': process.env.CHANGENOW_API_KEY as string
  }
})
