import { Currencies } from 'services/ChangeNowService'

import * as S from './styles'

type Props = {
  name: string
  currencies: Currencies[]
}

export const Select = ({ name, currencies }: Props) => {
  return (
    <S.Container id={name}>
      {currencies?.map((currency) => (
        <S.Option
          key={currency.network + ':' + currency.ticker}
          value={`${currency.name} - ${currency.network?.toUpperCase()}`}
        >
          {currency.ticker?.toUpperCase()} - {currency.network?.toUpperCase()}
        </S.Option>
      ))}
    </S.Container>
  )
}
