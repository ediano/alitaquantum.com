import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow, apiKey } from 'services/ChangeNowService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await ChangeNow.get('/exchange/available-pairs', {
      headers: { ...apiKey }
    })

    return res.status(response.status).json(response.data)
  } catch (err: any) {
    return res.status(err.response.status).json(err.response.data)
  }
}

export default app(handler)
