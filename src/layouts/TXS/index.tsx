import { useEffect } from 'react'
import { useRouter } from 'next/router'

import ChangeNow from 'services/ChangeNowService'

import { start } from 'components/Status'
import { Spinner } from 'components/Spinner'
import { Waiting } from 'components/Waiting'
import { Finished } from 'components/Finished'

import * as S from './styles'

export const TXSLayout = () => {
  const { isReady, push } = useRouter()
  const { query } = useRouter()

  const { data, error } = ChangeNow.getTransactionStatus({
    id: query.id as string
  })

  useEffect(() => {
    if ((isReady && !query.id) || error) {
      push({ pathname: '/' }, undefined, { shallow: true })
    }
  }, [query, isReady, push, error])

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
      {data.status === 'finished' && <Finished {...data} />}
    </S.Container>
  )
}
