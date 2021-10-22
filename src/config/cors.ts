import cors from 'cors'

import { site } from 'config/site'

const isDev = process.env.NODE_ENV === 'development'

export const corsConfig = () => {
  const corsDefault = {
    origin: isDev ? 'http://localhost:3000' : site.url,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  }

  return cors({ ...corsDefault })
}
