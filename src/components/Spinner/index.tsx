import * as S from './styles'

export type Props = {
  heightBase?: string
  circle?: {
    width: string
    height: string
  }
}

export const Spinner = (props: Props) => {
  return <S.Container {...props} />
}
