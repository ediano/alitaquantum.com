import ReactMarkdown from 'react-markdown'

import * as S from './styles'

export type Props = {
  title: string
  body: string
  url?: URL
}

export const BodyMarkdown = ({ title, body }: Props) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        <S.WrapperBody>
          <ReactMarkdown>{body}</ReactMarkdown>
          <a
            href="https://changenow.io/terms-of-use"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            acesse aqui
          </a>
          .
        </S.WrapperBody>
      </S.Wrapper>
    </S.Container>
  )
}
