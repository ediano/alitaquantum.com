import { ReactNode } from 'react'

import { Navbar, OptionsLayout } from 'components/Navbar'

import * as S from './styles'

type Props = {
  layout?: OptionsLayout
  children?: ReactNode
}

export const Header = ({ layout = 'default', children }: Props) => {
  return (
    <S.Container layout={layout}>
      <Navbar layout={layout} />

      {children}
    </S.Container>
  )
}
