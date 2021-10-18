import { InputHTMLAttributes } from 'hoist-non-react-statics/node_modules/@types/react'
import {} from 'react'

import * as S from './styles'

export type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = ({ type = 'text', name, ...props }: Props) => {
  return <S.Container type={type} name={name} {...props} />
}
