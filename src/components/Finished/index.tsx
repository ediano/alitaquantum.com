import { useState, useEffect } from 'react'

import { site } from 'config/site'
import ChangeNow, { TransactionStatus } from 'services/ChangeNowService'

import { Shared } from 'components/Shared'

import * as S from './styles'

type Props = Partial<TransactionStatus>

export const Finished = (props: Props) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    async function loading() {
      try {
        const { data: currencies } = await ChangeNow.getCurrencies()

        const from = currencies.find(
          (currency) => currency.ticker === props.fromCurrency
        )
        const to = currencies.find(
          (currency) => currency.ticker === props.toCurrency
        )

        setQuery(
          `/exchange?fromAmount=${props.amountFrom}&fromName=${from?.name}&toName=${to?.name}`
        )
      } catch (err) {}
    }

    loading()
  }, [props.amountFrom, props.fromCurrency, props.toCurrency])

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
          <Shared uri={site.url + query} />
        </S.WrapperShared>
      </S.BlockPrimary>
    </S.Container>
  )
}
