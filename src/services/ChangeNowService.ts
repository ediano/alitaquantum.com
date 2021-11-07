import axios from 'axios'

const apiKey = {
  'x-changenow-api-key': process.env.NEXT_PUBLIC_CHANGENOW_API_KEY as string
}

const contentType = {
  'content-type': 'application/json'
}

export const ChangeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2'
})

export type Currencies = {
  ticker: string
  name: string
  network: string
  hasExternalId: boolean
  image: string
}

export const getCurrencies = async () => {
  return ChangeNow.get<Currencies[]>('/exchange/currencies', {
    params: { active: true, flow: 'standard' }
  })
}

export type ReqRange = {
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
    params: { flow: 'standard', ...params }
  })
}

export type ReqEstimatedAmount = {
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
    params: { flow: 'standard', ...params }
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

export type ReqCreateExchangeTransaction = {
  type: string
  flow: string
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
  params: Omit<ReqCreateExchangeTransaction, 'type' | 'flow'>
) => {
  return ChangeNow.post<
    ReqCreateExchangeTransaction,
    { data: CreateExchangeTransaction; status: number }
  >(
    '/exchange',
    {
      ...params,
      type: 'direct',
      flow: 'standard'
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
  createdAt: string
  updatedAt: string
  depositReceivedAt: string
  payinHash: null | string
  payoutHash: null | string
}

export const getTransactionStatus = async (params: ReqTransactionStatus) => {
  return ChangeNow.get<TransactionStatus>('/exchange/by-id', {
    headers: { ...apiKey },
    params: { ...params }
  })
}

export default {
  getCurrencies,
  getRange,
  getEstimatedAmount,
  getValidateAddress,
  setCreateExchangeTransaction,
  getTransactionStatus
}
