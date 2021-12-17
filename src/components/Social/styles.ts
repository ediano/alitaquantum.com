import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  margin-top: 2.5rem;
`

export const Anchor = styled.a`
  & + & {
    margin-left: 1rem;
  }

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.m};
    color: ${theme.colors.white};

    &:hover {
      color: ${shade(0.3, theme.colors.white)};
    }
  `}
`
