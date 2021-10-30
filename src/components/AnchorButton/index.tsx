import Link, { LinkProps } from 'next/link'
import { CSSProperties } from 'styled-components'

import * as S from './styles'

type Props = {
  title: string
  disabled?: boolean
  uppercase?: boolean
  style?: CSSProperties
} & LinkProps &
  S.ColorsProps &
  CSSProperties

export const AnchorButton = ({
  title,
  color,
  background,
  disabled = false,
  uppercase = false,
  style,
  ...props
}: Props) => {
  if (disabled) {
    return (
      <S.Container
        color={color}
        background={background}
        style={style}
        disabled={disabled}
        uppercase={uppercase}
      >
        {title}
      </S.Container>
    )
  }

  return (
    <Link {...props} passHref>
      <S.Container
        color={color}
        background={background}
        style={style}
        disabled={disabled}
        uppercase={uppercase}
      >
        {title}
      </S.Container>
    </Link>
  )
}
