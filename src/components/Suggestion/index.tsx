import Image from 'next/image'

import * as S from './styled'

import { SuggestionsProps } from 'types/components'

type Props = {
  suggestions: SuggestionsProps[]
}

export const Suggestion = ({ suggestions }: Props) => {
  return (
    <S.Container as="section">
      {suggestions.map(({ title, link, image, description }) => (
        <S.Wrapper key={title}>
          <S.Figure>
            <Image
              src={image.src}
              alt={title}
              layout="fill"
              placeholder="blur"
              blurDataURL={image.src}
            />
          </S.Figure>
          <S.Description>
            {description}

            <S.Link
              href={link}
              target="_blank"
              aria-label={title}
              rel="nofollow noopener noreferrer"
            >
              Saiba mais!
            </S.Link>
          </S.Description>
        </S.Wrapper>
      ))}
    </S.Container>
  )
}
