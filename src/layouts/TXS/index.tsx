import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { ChangeNow, apiKey, TransactionStatus } from 'services/ChangeNowService'

import { start } from 'components/Status'
import { Spinner } from 'components/Spinner'
import { Waiting } from 'components/Waiting'

import * as S from './styles'

export const TXSLayout = () => {
  const { isReady, push } = useRouter()
  const { id: transactionId } = useRouter().query as { id: string }

  const { data, error } = useSWR<TransactionStatus | null>(
    `/exchange/by-id?id=${transactionId}`,
    async (url: string) => {
      if (transactionId) {
        return (await ChangeNow.get(url, { headers: { ...apiKey } })).data
      }
      return null
    }
  )

  useEffect(() => {
    if ((isReady && !transactionId) || error) {
      push({ pathname: '/' }, undefined, { shallow: true })
    }
  }, [transactionId, isReady, push, error])

  if (!data) {
    return (
      <Spinner heightBase="80vh" circle={{ width: '250px', height: '250px' }} />
    )
  }

  return (
    <S.Container>
      {start.includes(data.status) && <Waiting {...data} />}
      {!start.includes(data.status) && data.status !== 'finished' && (
        <>possível erro</>
      )}
      {data.status === 'finished' && <>sucesso</>}
    </S.Container>
  )
}
