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
  list,
  label,
  isValue,
  icon: Icon,
  srcImage,
  background,
  color,
  ...props
}: Props) => {
  return (
    <S.Container background={background} color={color} {...props}>
      {Icon && !srcImage && (
        <S.WrapperIcon>
          <Icon />
        </S.WrapperIcon>
      )}
      {!Icon && srcImage && (
        <S.WrapperIcon style={{ backgroundImage: `url("${srcImage}")` }} />
      )}

      <S.Input
        type={type}
        name={name}
        color={color}
        list={list}
        {...{ ...props, className: '' }}
      />

      {label && (
        <S.Label htmlFor={name} color={color} isValeu={isValue}>
          {label}
        </S.Label>
      )}
    </S.Container>
  )
}

export default Input
