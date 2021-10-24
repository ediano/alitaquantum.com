import { useCallback } from 'react'

import { Currencies } from 'services/ChangeNowService'

import * as S from './styles'

type Props = {
  name: string
  currencies: Currencies[]
}

export const Select = ({ name, currencies }: Props) => {
  const handleDatalistChange = useCallback(() => {}, [])

  return (
    <S.Container id={name} onChange={handleDatalistChange}>
      {currencies?.map((currency, index) => (
        <S.Option key={currency.ticker + index} value={currency.name} />
      ))}
    </S.Container>
  )
}
