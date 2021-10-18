import { useCallback } from 'react'

import { AvailableCurrenciesProps } from 'components/Form'

import * as S from './styles'

type Props = {
  name: string
  currencies: AvailableCurrenciesProps[]
}

export const Select = ({ name, currencies }: Props) => {
  const handleDatalistChange = useCallback(() => {}, [])

  return (
    <S.Container id={name} onChange={handleDatalistChange}>
      {currencies.map((currency, index) => (
        <S.Option key={currency.ticker + index} value={currency.name} />
      ))}
    </S.Container>
  )
}
