import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

export const middleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: NextApiHandler
) => {
  const isAlitaQuantum = req.headers['x-validating-app'] === 'alita-quantum'

  if (!isAlitaQuantum) return res.redirect(301, '/')

  return fn(req, res)
}
