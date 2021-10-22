import styled from 'styled-components'

import { OptionsLayout } from 'components/Navbar'

type Props = {
  layout?: OptionsLayout
}

export const Container = styled.header<Props>`
  position: relative;
`
