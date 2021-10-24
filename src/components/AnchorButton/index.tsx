import Link, { LinkProps } from 'next/link'
import { CSSProperties } from 'styled-components'

import * as S from './styles'

type Props = {
  title: string
  style?: CSSProperties
} & LinkProps &
  S.ColorsProps &
  CSSProperties

export const AnchorButton = ({
  title,
  color,
  background,
  style,
  ...props
}: Props) => {
  return (
    <Link {...props} passHref>
      <S.Container color={color} background={background} style={style}>
        {title}
      </S.Container>
    </Link>
  )
}
