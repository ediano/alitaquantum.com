import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'

import * as S from './styles'

export type Props = {
  title: string
  body: string
  children?: ReactNode
}

export const PagesLayout = ({ title, body, children }: Props) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        <S.Markdown>
          <ReactMarkdown>{body}</ReactMarkdown>
        </S.Markdown>

        {children && <S.Children>{children} </S.Children>}
      </S.Wrapper>
    </S.Container>
  )
}
