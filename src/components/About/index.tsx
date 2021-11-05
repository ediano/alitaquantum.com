import { memo } from 'react'
import ReactMarkdown from 'react-markdown'

import { AboutProps } from 'types/components'

import * as S from './styles'

const About = ({ title, body }: AboutProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        <S.Description>
          <ReactMarkdown>{body}</ReactMarkdown>
        </S.Description>
      </S.Wrapper>
    </S.Container>
  )
}

export default memo(About)
