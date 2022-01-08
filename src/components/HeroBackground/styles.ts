import styled, { css } from 'styled-components'
import NextImage from 'next/image'
import { transparentize } from 'polished'
import { lessThan } from 'styles/layout'

export const Container = styled.div`
  position: relative;
  padding: 100px 0;

  ${({ theme }) => css`
    background: ${theme.colors.ice};
  `}
`

export const Image = styled(NextImage)`
  opacity: 0.05;
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 500px;

  ${({ theme }) => css`
    background: ${theme.colors.secondary};
  `}
`

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;

  width: 90%;
  max-width: 1200px;
  margin: 0 auto;

  display: grid;
  gap: 1.5rem;
  grid-template-columns: 2.25fr 1fr;

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}

  ${({ theme }) => css`
    main {
      overflow: hidden;
      background: ${theme.colors.white};
      padding: ${theme.spacing.xxl};
      border-radius: ${theme.spacing.s};

      ${lessThan('s')(css`
        padding: ${theme.spacing.xxl} ${theme.spacing.m};
      `)}
    }

    aside {
      overflow: hidden;
      background: ${theme.colors.ice};
      padding: ${theme.spacing.xxl};
      border-radius: ${theme.spacing.s};

      ${lessThan('l')(css`
        padding: ${theme.spacing.xxl} ${theme.spacing.m};
      `)}
    }
  `}
`

export const CoinMarketCap = styled.a`
  display: block;
  text-align: center;

  transition: 0.4s;

  span {
    display: block;
  }

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xs};
    color: ${theme.colors.secondary};
    border-radius: ${theme.spacing.xs};
    border: 1px solid ${transparentize(0.75, theme.colors.secondary)};

    &:hover {
      border: 1px solid ${transparentize(0.25, theme.colors.secondary)};
    }
  `}
`
