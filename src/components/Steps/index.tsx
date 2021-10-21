import * as S from './styles'

import content from './content'

export const Steps = () => {
  return (
    <S.Container>
      <S.Title>{content.title}</S.Title>

      <S.Wrapper>
        {content.itens.map((item) => (
          <S.Item key={item.subtitle}>
            <S.Subtitle>{item.subtitle}</S.Subtitle>
          </S.Item>
        ))}
      </S.Wrapper>

      <S.Footer>
        <S.Subtitle>{content.description}</S.Subtitle>
      </S.Footer>
    </S.Container>
  )
}
