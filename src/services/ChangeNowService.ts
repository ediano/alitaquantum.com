import axios from 'axios'

const ChangeNow = axios.create({
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

export const getCurrencies = async () => {
  const params = ['active=true', 'flow=standard'].join('&')

  const response = await ChangeNow.get<Currencies[]>(`/currencies?${params}`)

  return response
}

export type ReqMinAmount = {
  fromCurrencyTicker: string
  toCurrencyTicker: string
  fromNetwork: string
  toNetwork: string
}

export type MinAmount = { minAmount: number }

export const getMinAmount = async (options: ReqMinAmount) => {
  const { fromCurrencyTicker, toCurrencyTicker, fromNetwork, toNetwork } =
    options

  const params = [
    `fromCurrency=${fromCurrencyTicker}`,
    `toCurrency=${toCurrencyTicker}`,
    `fromNetwork=${fromNetwork}`,
    `toNetwork=${toNetwork}`,
    'flow=standard'
  ].join('&')

  const response = await ChangeNow.get<MinAmount>(`/min-amount?${params}`)

  return response
}

export type ReqEstimatedAmount = {
  fromAmount: string
  fromCurrencyTicker: string
  toCurrencyTicker: string
  fromNetwork: string
  toNetwork: string
}

export type EstimatedAmount = {
  validUntil: string
  transactionSpeedForecast: string | null
  warningMessage: string | null
  fromAmount: number
  toAmount: number
}

export const getEstimatedAmount = async (options: ReqEstimatedAmount) => {
  const {
    fromAmount,
    fromCurrencyTicker,
    toCurrencyTicker,
    fromNetwork,
    toNetwork
  } = options

  const params = [
    `fromCurrency=${fromCurrencyTicker}`,
    `toCurrency=${toCurrencyTicker}`,
    `fromAmount=${fromAmount}`,
    `fromNetwork=${fromNetwork}`,
    `toNetwork=${toNetwork}`,
    'flow=fixed-rate'
  ].join('&')

  const response = await ChangeNow.get<EstimatedAmount>(
    `/estimated-amount?${params}`
  )

  return response
}

export default {
  getCurrencies,
  getMinAmount,
  getEstimatedAmount
}
