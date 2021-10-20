import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { getCurrencies } from 'services/ChangeNowService'

export type AvailableCurrencies = {
  ticker: string
  name: string
  network: string
  hasExternalId: boolean
}

const handlerCurrencies = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getCurrencies()

  const data = response.data.map((currency) => ({
    ticker: currency.ticker,
    name: currency.name,
    network: currency.network,
    hasExternalId: currency.hasExternalId
  }))

  res.status(response.status).json(data)
}

export default app.get(handlerCurrencies)
