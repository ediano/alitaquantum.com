import * as S from './styles'

import { StepsProps } from 'types/components'

export const Steps = ({ title, description, itens }: StepsProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>
          {title}
          <S.FootStepsIcon />
        </S.Title>

        <S.Itens>
          {itens.map(({ item, position }) => (
            <S.Item key={item}>
              <S.Position>{position}</S.Position>
              {item}
            </S.Item>
          ))}
        </S.Itens>

        <S.Description>
          {description}
          <S.SecureIcon />
        </S.Description>
      </S.Wrapper>
    </S.Container>
  )
}
