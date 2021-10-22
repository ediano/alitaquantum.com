import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import { site } from 'config/site'

export const app = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) => {
  const isAlitaQuantum = req.headers['x-validating-app'] === 'alita-quantum'

  if (!isAlitaQuantum) return res.redirect(site.url)

  return next()
}
