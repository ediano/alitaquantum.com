import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

import { middleware } from 'middlewares/middleware'

export const app = (fn: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await middleware(req, res, fn)
    return response
  }
}
