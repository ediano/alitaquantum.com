import styled, { css } from 'styled-components'
import { lighten, shade, transparentize } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.primary};
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} ${theme.spacing.xxl};
  `}
`

export const Title = styled.h2`
  text-align: center;

  ${({ theme }) => css`
    color: ${shade(0.7, theme.colors.primary)};
    margin-bottom: ${theme.spacing.xxl};
    font-size: ${theme.fonts.sizes.m};

    ${lessThan('m')(css`
      font-size: ${theme.fonts.sizes.sm};
    `)}
  `}
`

export const Content = styled.div`
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr 2fr;

  align-items: center;
  align-content: center;
  justify-items: center;

  border-radius: 22px;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${transparentize(0.1, theme.colors.white)};

    & + & {
      margin-top: ${theme.spacing.xxl};
    }
  `};

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}
`

export const Description = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.sm};
    color: ${theme.colors.secondary};

    ${lessThan('m')(css`
      text-align: center;
      font-size: ${theme.fonts.sizes.s};
      font-weight: ${theme.fonts.weight.regular};
    `)}
  `}
`

export const Figure = styled.figure`
  position: relative;
  width: 200px;
  height: 200px;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
    box-shadow: 0 0 12px 2px ${lighten(0.5, theme.colors.secondary)};
    border-radius: 50%;
  `}

  ${lessThan('l')(css`
    width: 150px;
    height: 150px;
  `)}

  ${lessThan('s')(css`
    width: 100px;
    height: 100px;
  `)}
`
