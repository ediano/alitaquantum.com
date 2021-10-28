import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

import { Props as CSSProps } from './styles'
import * as S from './styles'

export type Props = {
  icon?: IconType
  srcImage?: string
} & InputHTMLAttributes<HTMLInputElement> &
  CSSProps

export const Input = ({
  type = 'text',
  name,
  icon: Icon,
  srcImage,
  bg,
  color,
  ...props
}: Props) => {
  console.log(props)
  return (
    <S.Container isIconOrImage={!!Icon || !!srcImage}>
      {Icon && !srcImage && (
        <S.WrapperIcon>
          <Icon />
        </S.WrapperIcon>
      )}
      {!Icon && srcImage && (
        <S.WrapperIcon style={{ backgroundImage: `url("${srcImage}")` }} />
      )}
      <S.Input type={type} name={name} bg={bg} color={color} {...props} />
    </S.Container>
  )
}
