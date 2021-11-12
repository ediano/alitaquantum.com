import { Exchange } from 'components/Exchange'

import * as S from './styles'

export const TickerLayout = () => {
  return (
    <S.Main>
      <S.Container>
        <Exchange />
      </S.Container>
    </S.Main>
  )
}
