import ReactMarkdown from 'react-markdown'

import * as S from './styles'

export type Props = {
  title: string
  body: string
  url?: string
}

export const BodyMarkdown = ({ title, body, url }: Props) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        <S.WrapperBody>
          <ReactMarkdown>{body}</ReactMarkdown>
          {url && (
            <a href={url} target="_blank" rel="nofollow noopener noreferrer">
              acesse aqui
            </a>
          )}
          .
        </S.WrapperBody>
      </S.Wrapper>
    </S.Container>
  )
}
