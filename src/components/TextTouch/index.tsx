import { Dispatch, SetStateAction } from 'react'

import * as S from './styled'

type Props = {
  message: string
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
}

export const TextTouch = ({ message, toggle = false, setToggle }: Props) => {
  if (!toggle) return null
  return (
    <S.Container>
      <S.Close onClick={() => setToggle(!toggle)}>X</S.Close>
      {message}
    </S.Container>
  )
}
