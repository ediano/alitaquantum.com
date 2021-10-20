import * as S from './styled'

type Props = {
  title: string
  image: { src: string; alt?: string }
  description: string
}

export const Suggestion = ({ title, image, description }: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.Image src={image.src} alt={image.alt} width={100} height={100} />

      <S.Description>{description}</S.Description>
    </S.Container>
  )
}
