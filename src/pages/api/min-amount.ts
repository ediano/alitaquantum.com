import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { getMinAmount, ReqMinAmount } from 'services/ChangeNowService'

const handlerMinAmount = async (
  req: NextApiRequest & { body: ReqMinAmount },
  res: NextApiResponse
) => {
  const response = await getMinAmount(req.body)

  res.status(response.status).json(response.data)
}

export default app.post(handlerMinAmount)
