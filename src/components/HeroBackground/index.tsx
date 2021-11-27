import * as S from './styles'

type Props = {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}

export const HeroBackground = ({ children }: Props) => {
  return (
    <S.Container>
      <S.Background />

      <S.Main>
        <S.Wrapper>{children}</S.Wrapper>
      </S.Main>
    </S.Container>
  )
}
