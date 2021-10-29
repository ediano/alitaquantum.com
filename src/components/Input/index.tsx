import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

import { Props as CSSProps } from './styles'
import * as S from './styles'

export type Props = {
  icon?: IconType
  srcImage?: string
  label?: string
  isValue?: boolean
} & InputHTMLAttributes<HTMLInputElement> &
  CSSProps

export const Input = ({
  type = 'text',
  name,
  label,
  isValue,
  icon: Icon,
  srcImage,
  bg,
  color,
  ...props
}: Props) => {
  return (
    <S.Container bg={bg} color={color}>
      {Icon && !srcImage && (
        <S.WrapperIcon>
          <Icon />
        </S.WrapperIcon>
      )}
      {!Icon && srcImage && (
        <S.WrapperIcon style={{ backgroundImage: `url("${srcImage}")` }} />
      )}

      <S.Input type={type} name={name} color={color} {...props} />

      {label && (
        <S.Label htmlFor={name} isValeu={isValue}>
          {label}
        </S.Label>
      )}
    </S.Container>
  )
}
