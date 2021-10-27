import { Currencies } from 'services/ChangeNowService'

import * as S from './styles'

type Props = {
  name: string
  currencies: Currencies[]
}

export const Select = ({ name, currencies }: Props) => {
  return (
    <S.Container id={name}>
      {currencies?.map((currency, index) => (
        <S.Option key={currency.ticker + index} value={currency.name} />
      ))}
    </S.Container>
  )
}
