import Link, { LinkProps } from 'next/link'
import { CSSProperties } from 'styled-components'

import * as S from './styles'

type Props = {
  title: string
  style?: CSSProperties
} & LinkProps

export const AnchorButton = ({ title, style, ...props }: Props) => {
  return (
    <Link {...props} passHref>
      <S.Container style={style}>{title}</S.Container>
    </Link>
  )
}
