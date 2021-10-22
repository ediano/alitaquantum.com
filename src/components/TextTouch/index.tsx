import * as S from './styled'

type Props = {
  message: string
}

export const TextTouch = ({ message }: Props) => {
  return <S.Container>{message}</S.Container>
}
