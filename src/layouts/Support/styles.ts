import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.section`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.whiteIce};
  `}
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const Title = styled.h1`
  display: block;
  width: 100%;
  margin-bottom: 2.5rem;
`

export const Welcome = styled.div``

export const Markdown = styled.div`
  display: block;
  overflow: hidden;

  > * {
    display: block;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }

  ${({ theme }) => css`
    a {
      color: ${shade(0.25, theme.colors.primary)};
      border-bottom: 1px dashed;
    }

    a:hover {
      color: ${shade(0.5, theme.colors.primary)};
    }
  `}
`
