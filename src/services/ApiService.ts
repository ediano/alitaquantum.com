import axios from 'axios'
import swr from 'swr'
import { stringify } from 'query-string'

import type {
  Currencies,
  Range,
  ReqRange,
  EstimatedAmount,
  ReqEstimatedAmount,
  ReqValidateAddress,
  ValidateAddress,
  ReqCreateExchangeTransaction,
  CreateExchangeTransaction,
  ReqTransactionStatus,
  TransactionStatus
} from './ChangeNowService'
import type { TransactionFromData } from './from'

const Api = axios.create({
  baseURL: '/api',
  headers: {
    'x-validating-app': 'alita-quantum'
  }
})

export const getCurrencies = async () => {
  return Api.get<Currencies[]>('/currencies')
}

export const getRange = async (options: ReqRange) => {
  return Api.get<Range>('/range', {
    params: { ...options }
  })
}

export const getEstimatedAmount = async (options: ReqEstimatedAmount) => {
  return Api.get<EstimatedAmount>('/estimated-amount', {
    params: { ...options }
  })
}

export const getValidateAddress = async (options: ReqValidateAddress) => {
  return Api.get<ValidateAddress>('/validate-address', {
    params: { ...options }
  })
}

export const setCreateExchangeTransaction = async (
  options: ReqCreateExchangeTransaction
) => {
  return Api.get<CreateExchangeTransaction>('/create-exchange-transaction', {
    params: { ...options }
  })
}

export const getTransactionStatus = (params: ReqTransactionStatus) => {
  const uri = `/transaction-status?${stringify(params)}`

  const { data, error } = swr<TransactionStatus>(uri, async (url) => {
    const response = await Api.get(url)

    return response.data
  })

  return { data, error }
}

export const setForm = async (body: TransactionFromData) => {
  return Api.post('/form', body)
}
