import axios from 'axios'

import type {
  Currencies,
  ReqMinAmount,
  MinAmount,
  ReqEstimatedAmount,
  EstimatedAmount
} from './ChangeNowService'

const Api = axios.create({
  baseURL: '/api',
  headers: {
    'x-validating-app': 'alita-quantum'
  }
})

export const getCurrencies = async () => {
  const response = await Api.get<Currencies[]>('/currencies')
  return response
}

export const getMinAmount = async (options: ReqMinAmount) => {
  const response = await Api.get<MinAmount>('/min-amount', {
    params: { ...options }
  })

  return response
}

export const getEstimatedAmount = async (options: ReqEstimatedAmount) => {
  const response = await Api.get<EstimatedAmount>('/estimated-amount', {
    params: { ...options }
  })

  return response
}

export default {
  getCurrencies,
  getMinAmount,
  getEstimatedAmount
}
