import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.section`
  ${({ theme }) => css`
    background: ${shade(0.5, theme.colors.primary)};
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} ${theme.spacing.xxl};
  `}
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};

    ${lessThan('m')(css`
      font-size: ${theme.fonts.sizes.m};
    `)}
  `}
`

export const Message = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.sm};
  `}
`

export const Content = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 2fr;

  align-items: center;
  align-content: center;
  justify-items: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} 0;

    & + & {
      border-top: 1px solid ${lighten(0.5, theme.colors.secondary)};
    }
  `};

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}
`

export const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.ms};
    font-weight: ${theme.fonts.weight.light};
    color: ${theme.colors.whiteIce};

    ${lessThan('m')(css`
      text-align: center;
      font-size: ${theme.fonts.sizes.s};
      font-weight: ${theme.fonts.weight.regular};
    `)}
  `}
`

export const Figure = styled.figure`
  position: relative;
  width: 300px;
  height: 300px;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
    box-shadow: 0 0 12px 2px ${lighten(0.5, theme.colors.secondary)};
    border-radius: 50%;
  `}

  ${lessThan('l')(css`
    width: 200px;
    height: 200px;
  `)}
`
