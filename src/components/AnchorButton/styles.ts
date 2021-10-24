import styled, { css } from 'styled-components'
import { shade } from 'polished'

import { theme } from 'styles/theme'

type Theme = typeof theme.colors

export type ColorsProps = {
  color?: keyof Theme
  background?: keyof Theme
}

export const Container = styled.a<ColorsProps>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  transition: 0.2s;

  ${({ theme, color, background }) => css`
    color: ${theme.colors[color || 'whiteIce']};
    background: ${shade(0.25, theme.colors[background || 'primary'])};
    padding: ${theme.spacing.s};
    border-radius: ${theme.spacing.xs};
    font-size: ${theme.fonts.sizes.s};
    font-weight: ${theme.fonts.weight.bold};
    font-family: ${theme.fonts.family.secondary};
    box-shadow: 4px 4px 12px 0 ${theme.colors.secondary};

    &:hover {
      background: ${shade(0.5, theme.colors[background || 'primary'])};
    }
  `}
`
