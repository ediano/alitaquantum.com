import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.a`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  transition: 0.2s;

  ${({ theme }) => css`
    color: ${theme.colors.whiteIce};
    background: ${shade(0.25, theme.colors.primary)};
    padding: ${theme.spacing.s};
    border-radius: ${theme.spacing.xs};
    font-size: ${theme.fonts.sizes.s};
    font-weight: ${theme.fonts.weight.bold};
    font-family: ${theme.fonts.family.secondary};
    box-shadow: 4px 4px 12px 0 ${theme.colors.secondary};

    &:hover {
      background: ${shade(0.5, theme.colors.primary)};
    }
  `}
`
