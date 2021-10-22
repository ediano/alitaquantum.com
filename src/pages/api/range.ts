import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow } from 'services/ChangeNowService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await ChangeNow.get('/range', {
    params: { flow: 'standard', ...req.query }
  })

  return res.status(response.status).json(response.data)
}

export default app(handler)
