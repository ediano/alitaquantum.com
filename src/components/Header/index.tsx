import { ReactNode } from 'react'

import Navbar from 'components/Navbar'

import * as S from './styles'

export type Props = {
  isHero?: boolean
  children?: ReactNode
}

export const Header = ({ isHero, children }: Props) => {
  return (
    <S.Container isHero={isHero}>
      <Navbar isHero={isHero} />

      {children}
    </S.Container>
  )
}
