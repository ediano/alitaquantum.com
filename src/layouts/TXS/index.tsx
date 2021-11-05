import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'

import ChangeNow, { TransactionStatus } from 'services/ChangeNowService'

import * as S from './styles'

export const TXSLayout = () => {
  const { id: transactionId } = useRouter().query as { id: string }
  const [dataTransaction, setDataTransaction] = useState<TransactionStatus>(
    {} as TransactionStatus
  )

  const handlerLoadTransaction = useCallback(async (id: string) => {
    const response = await ChangeNow.getTransactionStatus({ id })

    setDataTransaction(response.data)
  }, [])

  useEffect(() => {
    if (transactionId) handlerLoadTransaction(transactionId)
  }, [transactionId, handlerLoadTransaction])

  console.log(dataTransaction)

  return <S.Container></S.Container>
}
