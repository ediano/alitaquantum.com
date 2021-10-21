import Image from 'next/image'

import * as S from './styled'

import { SuggestionsProps } from 'types/components'

export const Suggestion = ({ title, image, description }: SuggestionsProps) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <Image
        src={image.src}
        alt={title}
        width={100}
        height={100}
        objectFit="contain"
        placeholder="blur"
        blurDataURL={image.src}
      />

      <S.Description>{description}</S.Description>
    </S.Container>
  )
}
