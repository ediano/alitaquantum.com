import styled, { css } from 'styled-components'
import NextImage from 'next/image'
import { transparentize, shade } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.section`
  position: relative;
  z-index: 1;

  min-height: 100%;

  margin-top: -100px;
  padding-top: 100px;

  ${({ theme }) => css`
    background: ${theme.colors.ice};
  `}
`

export const Image = styled(NextImage)`
  opacity: 0.1;
`

export const Wrapper = styled(ContainerBase)`
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  min-height: 850px;

  ${lessThan('l')(css`
    flex-direction: column;
    justify-content: center;
  `)}
`

export const Block = styled.div`
  width: 50%;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} ${theme.spacing.m};
    margin: ${theme.spacing.xxl} auto;

    ${lessThan('l')(css`
      min-height: auto;
      width: 70%;
      margin: 0 auto;
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
      text-align: center;
    `)}

    ${lessThan('m')(css`
      width: 100%;
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
    `)}
  `}
`

export const ExchangeWrapper = styled(Block)`
  ${({ theme }) => css`
    border-radius: ${theme.spacing.s};
    background: ${transparentize(0.25, theme.colors.white)};
  `}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};
    font-family: ${theme.fonts.family.secondary};
    color: ${theme.colors.secondary};
    font-weight: ${theme.fonts.weight.regular};
    line-height: ${theme.spacing.xxl};

    ${lessThan('m')(css`
      font-size: ${theme.fonts.sizes.m};
      line-height: ${theme.spacing.l};
    `)}
  `}
`

export const Footer = styled.div`
  text-align: center;
  width: 100%;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} 0;
    margin-top: ${theme.spacing.xxl};
  `}
`

export const CoinMarketCap = styled.a`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;

  > div {
    margin-right: 0.75rem !important;
  }

  ${({ theme }) => css`
    background: ${theme.colors.ice};
    padding: ${theme.spacing.xs};
    border-radius: ${theme.spacing.xs};
    color: ${theme.colors.secondary};
    border: 1px solid ${transparentize(0.5, theme.colors.secondary)};

    &:hover {
      background: ${shade(0.025, theme.colors.ice)};
      border: 1px solid ${transparentize(0.25, theme.colors.secondary)};
    }
  `}

  ${lessThan('l')(css`
    display: none;
  `)}
`
