import axios from 'axios'
import swr from 'swr'
import { stringify } from 'query-string'

export const apiKey = {
  'x-changenow-api-key': process.env.NEXT_PUBLIC_CHANGENOW_API_KEY as string
}

export const contentType = {
  'content-type': 'application/json'
}

export const ChangeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2'
})

export type Flow = { flow: 'standard' | 'fixed-rate' }

export type RqCurrencies = Flow

export type Currencies = {
  ticker: string
  name: string
  network: string
  hasExternalId: boolean
  image: string
}

export const getCurrencies = async (params?: RqCurrencies) => {
  return ChangeNow.get<Currencies[]>('/exchange/currencies', {
    params: {
      active: true,
      flow: 'standard',
      ...params
    }
  })
}

export type ReqRange = Flow & {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
}

export type Range = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  maxAmount: number | null
  minAmount: number
}

export const getRange = async (params: ReqRange) => {
  return ChangeNow.get<Range>('/exchange/range', {
    headers: { ...apiKey },
    params: { ...params }
  })
}

export type ReqEstimatedAmount = Flow & {
  fromAmount: string
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
}

export type EstimatedAmount = {
  validUntil: string
  transactionSpeedForecast: string | null
  warningMessage: string | null
  fromAmount: number
  toAmount: number
}

export const getEstimatedAmount = async (params: ReqEstimatedAmount) => {
  return ChangeNow.get<EstimatedAmount>('/exchange/estimated-amount', {
    headers: { ...apiKey },
    params: { ...params }
  })
}

export type ReqValidateAddress = {
  address: string
  currency: string
}

export type ValidateAddress = {
  result: boolean
  message: string | null
}

export const getValidateAddress = async (params: ReqValidateAddress) => {
  return ChangeNow.get<ValidateAddress>('/validate/address', {
    params: { ...params }
  })
}

export type ReqCreateExchangeTransaction = Flow & {
  flow?: string
  type?: string
  fromAmount: string
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  address: string
  extraId?: string
  refundAddress?: string
  refundExtraId?: string
  contactEmail?: string
}

export type CreateExchangeTransaction = {
  id: string
  fromAmount: number
  toAmount: number
  payinAddress: string
  payoutAddress: string
  fromCurrency: string
  toCurrency: string
  fromNetwork: string
  toNetwork: string
  payoutExtraId?: string
  refundAddress?: string
  refundExtraId?: string
}

export const setCreateExchangeTransaction = async (
  params: Omit<ReqCreateExchangeTransaction, 'type'>
) => {
  return ChangeNow.post<
    ReqCreateExchangeTransaction,
    { data: CreateExchangeTransaction; status: number }
  >(
    '/exchange',
    {
      type: 'direct',
      ...params
    },
    { headers: { ...contentType, ...apiKey } }
  )
}

export type ReqTransactionStatus = {
  id: string
}

export type TransactionStatus = {
  id: string
  status:
    | 'new'
    | 'waiting'
    | 'confirming'
    | 'exchanging'
    | 'sending'
    | 'finished'
    | 'failed'
    | 'refunded'
    | 'verifying'
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  expectedAmountFrom: null | string
  expectedAmountTo: null | number
  amountFrom: null | number
  amountTo: null | number
  payinAddress: string
  payoutAddress: string
  payinExtraId: null | string
  payoutExtraId: null | string
  refundAddress: null | string
  refundExtraId: null | string
  createdAt: Date | string
  updatedAt: Date | string
  depositReceivedAt: Date | string
  payinHash: null | string
  payoutHash: null | string
}

export const getTransactionStatus = (params: ReqTransactionStatus) => {
  const uri = `/exchange/by-id?${stringify(params)}`

  const { data, error } = swr<TransactionStatus>(uri, async (url) => {
    const response = await ChangeNow.get(url, {
      headers: { ...apiKey }
    })

    return response.data
  })

  return { data, error }
}

type AvailablePairs = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  flow: {
    standard: boolean
  }
}

export const getAvailablePairs = async () => {
  const response = await ChangeNow.get<AvailablePairs[]>(
    'exchange/available-pairs',
    { headers: { ...apiKey } }
  )

  return response
}

export default {
  getCurrencies,
  getRange,
  getEstimatedAmount,
  getValidateAddress,
  setCreateExchangeTransaction,
  getTransactionStatus
}
