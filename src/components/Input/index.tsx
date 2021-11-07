import { InputHTMLAttributes } from 'react'
import { IconType } from 'react-icons'

import { Icon } from 'components/Icon'

import * as S from './styles'

export type Color = 'primary' | 'secondary' | 'alert' | 'error' | 'grey'

type Props = {
  input: InputHTMLAttributes<HTMLInputElement>
  label?: string
  icon?: { ico: IconType; color?: Color }
  image?: string
  name: string
  color?: Color
  isLoading?: boolean
  isOutline?: boolean
}

export const Input = ({
  input,
  label,
  icon,
  image,
  name,
  color,
  isLoading,
  isOutline
}: Props) => {
  return (
    <S.Container
      className={color}
      disabled={input?.disabled}
      data-loading={isLoading}
      data-outline={isOutline}
    >
      {icon?.ico && !image && <Icon color={icon.color} icon={icon.ico} />}
      {!icon?.ico && image && <Icon image={image} />}

      <S.Input name={name} className={color} {...input} />

      {label && (
        <S.Label
          htmlFor={name}
          className={color}
          data-value={!!input.value}
          data-icon={!!icon?.ico || !!image}
        >
          {label}
        </S.Label>
      )}
    </S.Container>
  )
}
