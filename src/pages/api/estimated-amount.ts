import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import {
  getEstimatedAmount,
  ReqEstimatedAmount
} from 'services/ChangeNowService'

const handlerEstimatedAmount = async (
  req: NextApiRequest & { body: ReqEstimatedAmount },
  res: NextApiResponse
) => {
  const response = await getEstimatedAmount(req.body)

  res.status(response.status).json(response.data)
}

export default app.post(handlerEstimatedAmount)
