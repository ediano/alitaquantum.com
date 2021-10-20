import styled, { css } from 'styled-components'
import { Container as ContainerBase } from 'styles/layout'

export const Main = styled.main`
  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
  `}
`

export const Container = styled(ContainerBase)``
