import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.div`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} 0;
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} ${theme.spacing.xxl};
    background: ${shade(0.5, theme.colors.secondary)};
    border-radius: ${theme.spacing.m};
    box-shadow: 0 0 50px 0 ${theme.colors.secondary};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.whiteIce};
    font-size: ${theme.fonts.sizes.l};
    font-family: ${theme.fonts.family.secondary};
    margin-bottom: ${theme.spacing.m};

    ${lessThan('m')(css`
      text-align: center;
      font-size: ${theme.fonts.sizes.m};
    `)}
  `}
`

export const Description = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.whiteIce};
    font-size: ${theme.fonts.sizes.sm};

    p + p {
      margin-top: ${theme.spacing.m};
    }

    ${lessThan('m')(css`
      text-align: center;
      font-size: ${theme.fonts.sizes.s};
    `)}
  `}
`
