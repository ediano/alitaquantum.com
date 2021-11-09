import { Dispatch, SetStateAction } from 'react'

import * as S from './styled'

type Props = {
  message: string
  toggle: boolean
  setToggle: Dispatch<SetStateAction<boolean>>
}

export const TextTouch = ({ message, toggle = false, setToggle }: Props) => {
  return (
    <S.Container data-toggle={toggle}>
      <S.Close onClick={() => setToggle(!toggle)}>X</S.Close>
      {message}
    </S.Container>
  )
}
