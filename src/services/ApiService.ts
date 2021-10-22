import axios from 'axios'

import type {
  Currencies,
  ReqMinAmount,
  MinAmount,
  ReqEstimatedAmount,
  EstimatedAmount
} from './ChangeNowService'

type Response<T> = T & { data: T }

const Api = axios.create({
  baseURL: '/api'
})

export const getCurrencies = async () => {
  const response = await Api.get<Currencies[]>('/currencies')
  return response
}

export const getMinAmount = async (options: ReqMinAmount) => {
  const response = await Api.post<ReqMinAmount, Response<MinAmount>>(
    '/min-amount',
    options
  )

  return response
}

export const getEstimatedAmount = async (options: ReqEstimatedAmount) => {
  const response = await Api.post<
    ReqEstimatedAmount,
    Response<EstimatedAmount>
  >('/estimated-amount', options)

  return response
}

export default {
  getCurrencies,
  getMinAmount,
  getEstimatedAmount
}
