import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow, ReqEstimatedAmount } from 'services/ChangeNowService'

const handlerEstimatedAmount = async (
  req: NextApiRequest & { query: ReqEstimatedAmount },
  res: NextApiResponse
) => {
  const response = await ChangeNow.get('/estimated-amount', {
    params: { flow: 'fixed-rate', ...req.query }
  })

  return res.status(response.status).json(response.data)
}

export default app.get(handlerEstimatedAmount)
