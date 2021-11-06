import styled, { css } from 'styled-components'

import { KeyColors } from 'styles/theme'

export type Props = {
  color?: KeyColors
}

export const Container = styled.span<Props>`
  display: flex;
  align-items: center;

  font-size: 1.8rem;

  width: 30px;
  height: 100%;

  background-repeat: no-repeat;
  background-position: 0 50%;

  ${({ theme, color }) => css`
    color: ${theme.colors[color || 'secondary']};
  `}
`
