import ReactMarkdown from 'react-markdown'

import { FAQProps } from 'types/pages'

import * as S from './styles'

export const FAQLayout = ({ title, content }: FAQProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        {content.map((item, index) => (
          <S.Details key={item.title} open={index === 0}>
            <S.Summary>{item.title}</S.Summary>

            <ReactMarkdown linkTarget="_blank">
              {item.description}
            </ReactMarkdown>
          </S.Details>
        ))}
      </S.Wrapper>
    </S.Container>
  )
}
