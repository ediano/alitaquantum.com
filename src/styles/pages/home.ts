import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { Container as ContainerBase } from 'styles/layout'

export const Main = styled.main`
  ${({ theme }) => css`
    background: ${shade(0.6, theme.colors.primary)};
    padding: ${theme.spacing.xxl};
  `}
`

export const Container = styled(ContainerBase)``
