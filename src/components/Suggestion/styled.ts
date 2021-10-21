import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.m};
    border-radius: ${theme.spacing.xs};
    box-shadow: ${theme.shadow};
  `}
`

export const Title = styled.h2``

export const Description = styled.p``
