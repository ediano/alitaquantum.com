import styled, { css } from 'styled-components'
import { shade } from 'polished'

import { lessThan } from 'styles/layout'

export const Container = styled.div`
  position: relative;
  padding: 100px 0;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
  `}
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 300px;

  ${({ theme }) => css`
    background: ${shade(0.5, theme.colors.primary)};
  `}
`

export const Main = styled.main`
  position: relative;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
    padding: 0 ${theme.spacing.xxl};

    ${lessThan('s')(css`
      padding: 0 ${theme.spacing.m};
    `)}
  `}
`

export const Wrapper = styled.div<{ maxWidth?: string }>`
  position: relative;
  z-index: 2;
  width: 100%;

  ${({ theme, maxWidth }) => css`
    max-width: ${maxWidth || '992px'};
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: 0 auto;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
    `)}
  `}
`
