import nc from 'next-connect'

import { corsConfig } from 'config/cors'

export const app = nc().use(corsConfig())
