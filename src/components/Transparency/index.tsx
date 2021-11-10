import Image from 'next/image'

import { TransparencyProps } from 'types/components'

import * as S from './styles'

export const Transparency = ({ title, content }: TransparencyProps) => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>{title}</S.Title>

        {content.map(({ alt, image, description }) => (
          <S.Content key={alt}>
            <S.Figure>
              <Image
                alt={alt}
                src={image}
                layout="fill"
                placeholder="blur"
                blurDataURL={image}
              />
            </S.Figure>

            <S.Description>{description}</S.Description>
          </S.Content>
        ))}
      </S.Wrapper>
    </S.Container>
  )
}
