import { ReactNode } from 'react'

import * as S from './styles'

type Props = {
  maxWidth?: string
  children: ReactNode
}

export const HeroBackground = ({ maxWidth, children }: Props) => {
  return (
    <S.Container>
      <S.Background>
        <S.Image
          alt="Capa Alita Quantum"
          src="/img/pages/capa.png"
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/img/pages/capa.png"
        />
      </S.Background>

      <S.Main>
        <S.Wrapper maxWidth={maxWidth}>{children}</S.Wrapper>
      </S.Main>
    </S.Container>
  )
}
