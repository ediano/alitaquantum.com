import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow, ReqMinAmount } from 'services/ChangeNowService'

const handlerMinAmount = async (
  req: NextApiRequest & { query?: ReqMinAmount },
  res: NextApiResponse
) => {
  const response = await ChangeNow.get('/min-amount', {
    params: { flow: 'fixed-rate', ...req.query }
  })

  return res.status(response.status).json(response.data)
}

export default app.get(handlerMinAmount)
