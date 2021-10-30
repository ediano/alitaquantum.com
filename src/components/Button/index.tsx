import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

type Props = {
  as?: 'button' | 'a'
  title: ReactNode
} & (ButtonProps | AnchorProps) &
  S.Props

export const Button = ({ as = 'button', title, ...props }: Props) => {
  return (
    <S.Container as={as} {...props}>
      {title}
    </S.Container>
  )
}
