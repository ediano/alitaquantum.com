import { ReactNode } from 'react'

import * as S from './styles'

type Props = {
  name: string
  data?: string[]
  children: ReactNode
}

export const Select = ({ name, data, children }: Props) => {
  return (
    <S.Container>
      {children}

      <S.Datalist id={name} defaultValue="btc">
        <S.Option value="btc">Bitcoin</S.Option>
        <S.Option value="ltc">Litecoin</S.Option>
        <S.Option value="bnb">Binance</S.Option>
        <S.Option value="trx">Tron</S.Option>
        <S.Option value="eth">Ethereum</S.Option>
      </S.Datalist>
    </S.Container>
  )
}
