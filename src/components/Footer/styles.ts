import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { Container as ContainerBase } from 'styles/layout'

export const Container = styled.footer`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} 0;
    background: ${shade(0.5, theme.colors.secondary)};
    box-shadow: 0 0 25px 0 ${theme.colors.secondary};
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    color: ${theme.colors.whiteIce};
  `}
`
