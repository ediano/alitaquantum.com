import styled, { css } from 'styled-components'
import NextImage from 'next/image'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.m};
    border-radius: ${theme.spacing.xs};
    box-shadow: ${theme.shadow};
  `}
`

export const Title = styled.h2``

export const Image = styled(NextImage)``

export const Description = styled.p``
