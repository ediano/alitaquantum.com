import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { Container as ContainerBase } from 'styles/layout'

export const Main = styled.main`
  ${({ theme }) => css`
    background: ${shade(0.4, theme.colors.secondary)};
    padding: ${theme.spacing.xxl};
  `}
`

export const Container = styled(ContainerBase)``
