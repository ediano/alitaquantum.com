import { ReactNode } from 'react'

import * as S from './styles'

type Props = {
  maxWidth?: string
  children: ReactNode
}

export const HeroBackground = ({ maxWidth, children }: Props) => {
  return (
    <S.Container>
      <S.Background />

      <S.Main>
        <S.Wrapper maxWidth={maxWidth}>{children}</S.Wrapper>
      </S.Main>
    </S.Container>
  )
}
