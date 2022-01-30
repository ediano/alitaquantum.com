import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow, Currencies } from 'services/ChangeNowService'
import { getImage } from 'utils/getImage'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await ChangeNow.get<Currencies[]>('/exchange/currencies', {
      params: { ...req.query }
    })

    const data = response.data.map((currency) => ({
      ticker: currency.ticker,
      name: currency.name,
      network: currency.network,
      hasExternalId: currency.hasExternalId,
      image: getImage(currency.ticker),
      legacyTicker: currency.legacyTicker
    }))

    return res.status(response.status).json(data)
  } catch (err: any) {
    return res.status(err.response.status).json(err.response.data)
  }
}

export default app(handler)
