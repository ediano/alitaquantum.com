import nc from 'next-connect'

import { corsConfig } from 'config/cors'
import { app as appValidating } from 'middlewares/validating'

const onNoMatch = (err: any, req: any, res: any) => {
  console.log({ err, req, res })
  return { err, req, res }
}

export const app = nc({ onError: onNoMatch, onNoMatch })
  .use(corsConfig())
  .use(appValidating)
