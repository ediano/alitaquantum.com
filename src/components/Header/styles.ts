import styled, { css } from 'styled-components'

import { OptionsLayout } from 'components/Navbar'

type Props = {
  layout?: OptionsLayout
}

export const Container = styled.header<Props>`
  position: relative;

  ${({ theme, layout }) => css`
    ${layout === 'default' &&
    css`
      box-shadow: 0 0 12px 0 ${theme.colors.secondary};
    `}
  `}
`
