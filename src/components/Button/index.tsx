import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

import { Props as StylesProps } from './styles'
import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

type Props = {
  as?: 'button' | 'a'
  title: ReactNode
} & (ButtonProps | AnchorProps) &
  StylesProps

export const Button = ({ as = 'button', title, ...props }: Props) => {
  return (
    <S.Container as={as} {...props}>
      {title}
    </S.Container>
  )
}
