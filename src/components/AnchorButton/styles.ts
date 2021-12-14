import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'

import { theme } from 'styles/theme'

type Theme = typeof theme.colors

export type Props = {
  color?: keyof Theme
  background?: keyof Theme
  disabled?: boolean
  uppercase?: boolean
}

export const Container = styled.a<Props>`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  transition: 0.2s;

  ${({ theme, color, background, disabled, uppercase }) => css`
    color: ${theme.colors[color || 'whiteIce']};
    background: ${shade(0.1, theme.colors[background || 'primary'])};
    padding: ${theme.spacing.s};
    border-radius: ${theme.spacing.xs};
    font-size: ${theme.fonts.sizes.s};
    font-weight: ${theme.fonts.weight.bold};
    font-family: ${theme.fonts.family.secondary};
    box-shadow: 2px 2px 12px 0 ${lighten(0.5, theme.colors.secondary)};

    &:hover {
      background: ${shade(0.2, theme.colors[background || 'primary'])};
    }

    ${uppercase &&
    css`
      text-transform: uppercase;
    `}

    ${disabled &&
    css`
      cursor: not-allowed;
      background: ${theme.colors.secondary};
      opacity: 0.9;

      &:hover {
        background: ${theme.colors.secondary};
      }
    `}
  `}
`
