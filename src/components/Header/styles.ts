import styled, { css } from 'styled-components'

import { OptionsLayout } from 'components/Navbar'

type Props = {
  layout?: OptionsLayout
}

export const Container = styled.header<Props>`
  ${({ layout }) =>
    layout === 'default' &&
    css`
      min-height: 100vh;
    `}
`
