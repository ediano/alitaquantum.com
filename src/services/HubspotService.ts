import axios from 'axios'

export const Hubspot = axios.create({
  baseURL: 'https://api.hsforms.com/submissions/v3'
})

export const config = {
  portalId: '21185736',
  form: {
    transaction: '82b603a0-67d9-42c9-9dab-21e0a99afbe5'
  }
}

export type TransactionFromData = {
  email: string
  transactionId: string
  fromAmount: string
  fromCurrency: string
  toCurrency: string
  fromAddress: string
  fromExtraId?: string
  toAddress: string
  toExtraId?: string
  toAmount: string
}
