import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import { ChangeNow, apiKey, contentType } from 'services/ChangeNowService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await ChangeNow.post(
      '/exchange',
      { ...req.query },
      { headers: { ...contentType, ...apiKey } }
    )

    return res.status(response.status).json(response.data)
  } catch (err: any) {
    return res.status(err.response.status).json(err.response.data)
  }
}

export default app(handler)
