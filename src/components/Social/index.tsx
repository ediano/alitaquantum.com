import * as S from './styles'

import content from './content'

export const Social = () => {
  return (
    <S.Container>
      {content.map(({ social, url, icon: Icon }) => (
        <S.Anchor
          key={url}
          href={url}
          title={social}
          target="_blank"
          rel="noopener"
        >
          <Icon />
        </S.Anchor>
      ))}
    </S.Container>
  )
}
