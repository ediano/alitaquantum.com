import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import { lessThan } from 'styles/layout'

export const Container = styled.section`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.whiteIce};
  `}
`

export const Wrapper = styled.section`
  width: 100%;
  max-width: 992px;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: 0 auto;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

export const Block = styled.div`
  ${({ theme }) => css`
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};
    border-radius: ${theme.spacing.xxs};
    padding: ${theme.spacing.m};

    & + & {
      margin-top: ${theme.spacing.xxl};
    }
  `}
`

export const WrapperDataFrom = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr auto;
  align-items: center;

  ${({ theme }) => css`
    & + & {
      margin-top: ${theme.spacing.m};
      padding-top: ${theme.spacing.m};
      border-top: 1px dashed ${lighten(0.5, theme.colors.secondary)};
    }
  `}

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}
`

export const ContentDataFrom = styled.div`
  overflow: hidden;
`

export const Info = styled.span`
  display: block;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: 0.2s;

  ${({ theme, onClick }) => css`
    &.primary {
      font-size: ${theme.fonts.sizes.sm};
      font-family: ${theme.fonts.family.secondary};
      font-weight: ${theme.fonts.weight.bold};
      margin-bottom: ${theme.spacing.m};
      color: ${theme.colors.secondary};
    }

    ${onClick &&
    css`
      cursor: pointer;
    `}

    &.copy {
      color: ${theme.colors.primary};
    }
  `};
`

export const Copy = styled.span`
  cursor: pointer;

  ${({ theme }) => css`
    font-size: 1.2rem;
    font-weight: ${theme.fonts.weight.bold};

    svg {
      color: ${theme.colors.primary};
    }

    svg {
      margin-left: ${theme.spacing.s};
    }
  `};
`

export const AmountReceived = styled.div`
  ${({ theme }) => css`
    border-top: 1px solid ${lighten(0.6, theme.colors.secondary)};
    padding-top: ${theme.spacing.s};
  `}
`

export const Title = styled.strong`
  display: block;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.sm};
    margin-bottom: ${theme.spacing.s};
    color: ${lighten(0.25, theme.colors.secondary)};
  `}
`

export const Status = styled.div`
  display: block;
`
