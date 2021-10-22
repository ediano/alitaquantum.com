import axios from 'axios'

export const ChangeNow = axios.create({
  baseURL: 'https://api.changenow.io/v2/exchange',
  headers: {
    'x-changenow-api-key': process.env.NEXT_PUBLIC_CHANGENOW_API_KEY as string
  }
})

export type Currencies = {
  ticker: string
  name: string
  network: string
  hasExternalId: boolean
}

export type ReqMinAmount = {
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
}

export type MinAmount = { minAmount: number }

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
