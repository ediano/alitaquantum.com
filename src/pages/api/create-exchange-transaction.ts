import { NextApiRequest, NextApiResponse } from 'next'

import { app } from 'app'
import {
  ChangeNow,
  ReqCreateExchangeTransaction,
  CreateExchangeTransaction
} from 'services/ChangeNowService'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query as ReqCreateExchangeTransaction

  try {
    const response = await ChangeNow.post<
      ReqCreateExchangeTransaction,
      { data: CreateExchangeTransaction; status: number }
    >('/exchange', {
      ...query,
      type: 'direct',
      flow: 'standard'
    })

    return res.status(response.status).json(response.data)
  } catch (err: any) {
    return res.status(err.response.status).json(err.response.data)
  }
}

export default app(handler)
