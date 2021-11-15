import ReactMarkdown from 'react-markdown'

import { SupportProps } from 'types/home'

import * as S from './styles'

export const SupportLayout = ({ welcome }: SupportProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Welcome>
          <S.Title>{welcome.title}</S.Title>

          <S.Markdown>
            <ReactMarkdown>{welcome.body}</ReactMarkdown>
          </S.Markdown>
        </S.Welcome>
      </S.Wrapper>
    </S.Container>
  )
}
