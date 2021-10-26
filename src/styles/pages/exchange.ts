import styled, { css } from 'styled-components'

export const Main = styled.main`
  position: relative;
  overflow: hidden;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
  `}
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: ${theme.calc(theme.spacing.xxl, 2)} auto;
    border-radius: ${theme.spacing.s};
  `}
`
