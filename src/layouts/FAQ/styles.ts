import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { lessThan } from 'styles/layout'

export const Container = styled.section`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.ice};

    ${lessThan('s')(css`
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
    `)}
  `}
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
    `)}
  `}
`

export const Title = styled.h1`
  display: block;
  width: 100%;
  margin-bottom: 2.5rem;
`

export const Details = styled.details`
  display: block;
  overflow: hidden;

  > * {
    display: block;
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
    text-align: justify;
  }

  li {
    list-style: disc;
    margin-left: 5rem;
  }

  ${({ theme }) => css`
    & + & {
      border-top: 1px solid ${theme.colors.gray};
    }

    a {
      color: ${shade(0.25, theme.colors.primary)};
      border-bottom: 1px dashed;
    }

    a:hover {
      color: ${shade(0.5, theme.colors.primary)};
    }
  `}
`

export const Summary = styled.summary`
  ${({ theme }) => css`
    cursor: pointer;
    font-weight: ${theme.fonts.weight.bold};
  `}
`
