import { IconType } from 'react-icons'

import * as S from './styles'

type Props = { icon?: IconType; image?: string } & S.Props

export const Icon = ({ color, icon: Icon, image }: Props) => {
  return (
    <S.Container
      color={color}
      style={{ backgroundImage: `url("${!Icon && image}")` }}
    >
      {Icon && <Icon />}
    </S.Container>
  )
}
