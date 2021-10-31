import styled, { css } from 'styled-components'
import { shade } from 'polished'

import { theme } from 'styles/theme'

type Theme = typeof theme.colors

export type Props = {
  color?: keyof Theme
  background?: keyof Theme
  disabled?: boolean
  uppercase?: boolean
}

export const Container = styled.button<Props>`
  cursor: pointer;
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  transition: 0.2s;

  ${({ theme, color, background, uppercase, disabled }) => css`
    color: ${theme.colors[color || 'whiteIce']};
    background: ${shade(0.1, theme.colors[background || 'secondary'])};
    padding: ${theme.spacing.s};
    border-radius: ${theme.spacing.xs};
    font-size: ${theme.fonts.sizes.s};
    font-weight: ${theme.fonts.weight.bold};
    font-family: ${theme.fonts.family.secondary};
    box-shadow: 4px 4px 12px 0 ${theme.colors.secondary};

    &:hover {
      background: ${shade(0.5, theme.colors[background || 'secondary'])};
    }

    ${disabled &&
    css`
      cursor: not-allowed;
      &:hover {
        background: ${shade(0.1, theme.colors[background || 'secondary'])};
      }
    `}

    ${uppercase &&
    css`
      text-transform: uppercase;
    `}
  `}
`
