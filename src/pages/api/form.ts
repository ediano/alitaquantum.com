import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { Hubspot, config } from 'services/HubspotService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    email,
    transactionId,
    fromAmount,
    fromCurrency,
    toCurrency,
    fromAddress,
    fromExtraId,
    toAddress,
    toExtraId,
    toAmount
  } = req.body

  const fields = [
    { name: 'email', value: email },
    { name: 'transactionid', value: transactionId },
    { name: 'fromamount', value: fromAmount },
    { name: 'fromcurrency', value: fromCurrency },
    { name: 'tocurrency', value: toCurrency },
    { name: 'fromaddress', value: fromAddress },
    { name: 'fromextraid', value: fromExtraId },
    { name: 'toaddress', value: toAddress },
    { name: 'toextraid', value: toExtraId },
    { name: 'toamount', value: toAmount }
  ]

  try {
    await Hubspot.post(
      `/integration/submit/${config.portalId}/${config.form.transaction}`,
      {
        submittedAt: new Date().getTime(),
        fields,
        context: {
          pageUri: 'www.alitaquantum.com',
          pageName: 'Transaction From Data'
        }
      },
      { headers: { 'content-type': 'application/json' } }
    )

    return res.status(201).json({})
  } catch (err: any) {
    return res.status(err.response.status).json(err.response.data)
  }
}

export default app(handler)
