import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

import * as S from './styles'

export type Props = {
  icon?: IconType
  srcImage?: string
  label?: string
} & InputHTMLAttributes<HTMLInputElement> &
  S.Props

export const Input = ({
  type = 'text',
  name,
  list,
  label,
  icon: Icon,
  srcImage,
  background,
  color,
  colorIcon,
  ...props
}: Props) => {
  return (
    <S.Container background={background} color={color} {...props}>
      {Icon && !srcImage && (
        <S.WrapperIcon color={colorIcon}>
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
        <S.Label
          htmlFor={name}
          color={color}
          isValue={!!props.value}
          isIcon={!!Icon || !!srcImage}
        >
          {label}
        </S.Label>
      )}
    </S.Container>
  )
}
