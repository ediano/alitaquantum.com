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
      <S.Wrapper>
        {start.includes(data.status) && <Waiting {...data} />}
        {data.status === 'failed' && (
          <S.Block>
            <S.IconError />

            <div>
              <strong>ID: {data.id}</strong>
              <p>Ocorreu um erro.</p>
              <p>
                Se você cadastrou sua carteira de reembolso um estorno será
                processado automaticamente, caso o contrario entre em contato
                com o suporte para mais detalhes.
              </p>

              <p>
                Aceite nossas desculpas pelo transtorno que causamos a você.
              </p>
            </div>
          </S.Block>
        )}
        {data.status === 'refunded' && (
          <S.Block>
            <S.IconDoneAll />

            <div>
              <p>O reembolso foi processado com sucesso.</p>
              <p>
                Aceite nossas desculpas pelo transtorno que causamos a você.
              </p>

              <p>Obrigado pela sua paciência e compreensão.</p>
            </div>
          </S.Block>
        )}
        {data.status === 'finished' && <Finished {...data} />}
      </S.Wrapper>
    </S.Container>
  )
}
