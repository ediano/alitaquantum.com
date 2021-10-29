import axios from 'axios'

import type {
  Currencies,
  Range,
  ReqRange,
  EstimatedAmount,
  ReqEstimatedAmount,
  ReqValidateAddress,
  ValidateAddress
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

export const getRange = async (options: ReqRange) => {
  const response = await Api.get<Range>('/range', {
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

export const getValidateAddress = async (options: ReqValidateAddress) => {
  const response = await Api.get<ValidateAddress>('/validate-address', {
    params: { ...options }
  })

  return response
}

export default {
  getCurrencies,
  getRange,
  getEstimatedAmount,
  getValidateAddress
}
