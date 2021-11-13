import { site } from 'config/site'
import content from './content'

import * as S from './styles'

type Props = {
  path: string
  message?: string
}

export const Shared = ({ path, message }: Props) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>Compartilhar:</S.Title>

        <S.WrapperIcon>
          {content.map(({ social, icon: Icon, url }) => (
            <S.Anchor
              key={social}
              href={url + site.url + path}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Icon />
            </S.Anchor>
          ))}
        </S.WrapperIcon>
      </S.Wrapper>

      <S.Description>{message}</S.Description>
    </S.Container>
  )
}
