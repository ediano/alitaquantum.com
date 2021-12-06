import { parseISO, format } from 'date-fns'

import { TransactionStatus } from 'services/ChangeNowService'
import { Shared } from 'components/Shared'

import * as S from './styles'

type Props = Partial<TransactionStatus>

export const Finished = (props: Props) => {
  const dateParse = parseISO(props.updatedAt as string)
  const date = format(dateParse, "dd'/'MM'/'yyyy, HH:mm'h'")

  return (
    <S.Container>
      <S.BlockPrimary>
        <S.IconDoneAll />
        <S.Title>Parabéns suas moedas foram trocadas</S.Title>

        <S.FromTo>
          <S.Item>
            <S.Strong className="from">{props.fromCurrency}</S.Strong>{' '}
            {props.amountFrom}
          </S.Item>

          <S.IconArrowDown />

          <S.Item>
            <S.Strong className="to">{props.toCurrency}</S.Strong>{' '}
            {props.amountTo}
          </S.Item>
        </S.FromTo>

        <S.WrapperShared>
          <Shared
            path={`/trocar-${props.fromCurrency}-para-${props.toCurrency}`}
            message="Conte aos seus amigos os pares de moedas que você acabou de trocar!"
          />
        </S.WrapperShared>
      </S.BlockPrimary>

      <S.BlockSecondary>
        <S.Title>Detalhes da transação</S.Title>

        <S.WrapperBlockDetalhes>
          <S.BlockDetalhes>
            <S.Text>Finalizada em:</S.Text>
            <S.Text className="primary">{date}</S.Text>
            <S.Text>ID:</S.Text>
            <S.Text className="primary">{props.id}</S.Text>
          </S.BlockDetalhes>
        </S.WrapperBlockDetalhes>

        <S.WrapperBlockDetalhes>
          <S.Subtitle>Enviado</S.Subtitle>

          <S.BlockDetalhes>
            <S.Text>Moeda:</S.Text>
            <S.Text className="primary">
              {' '}
              {props.fromCurrency?.toUpperCase()}
            </S.Text>
            <S.Text>HASH:</S.Text>
            <S.Text className="primary">{props.payinHash}</S.Text>
          </S.BlockDetalhes>
        </S.WrapperBlockDetalhes>

        <S.WrapperBlockDetalhes>
          <S.Subtitle>Recebido</S.Subtitle>

          <S.BlockDetalhes>
            <S.Text>Moeda:</S.Text>
            <S.Text className="primary">
              {props.toCurrency?.toUpperCase()}
            </S.Text>
            <S.Text>HASH:</S.Text>
            <S.Text className="primary">{props.payoutHash}</S.Text>
          </S.BlockDetalhes>
        </S.WrapperBlockDetalhes>
      </S.BlockSecondary>
    </S.Container>
  )
}
