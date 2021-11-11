import content from './content'

import * as S from './styles'

type Props = {
  uri: string
}

export const Shared = ({ uri }: Props) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Compartilhar:</S.Title>

        <S.WrapperIcon>
          {content.map(({ social, icon: Icon, url }) => (
            <S.Anchor
              key={social}
              href={url + uri}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Icon />
            </S.Anchor>
          ))}
        </S.WrapperIcon>
      </S.Wrapper>

      <S.Description>
        Conte aos seus amigos os pares de moedas que você acabou de trocar!
      </S.Description>
    </S.Container>
  )
}
