import axios from 'axios'

export const ChangeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2',
  headers: {
    'content-type': 'application/json',
    'x-changenow-api-key': process.env.NEXT_PUBLIC_CHANGENOW_API_KEY as string
  }
})

export type Currencies = {
  ticker: string
  name: string
  network: string
  hasExternalId: boolean
  image: string
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

export type ReqValidateAddress = {
  address: string
  currency: string
}

export type ValidateAddress = {
  result: boolean
  message: string | null
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
