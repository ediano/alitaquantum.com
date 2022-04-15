import styled, { css } from 'styled-components'
import {
  Container as ContainerBase,
  lessThan,
  greaterThan
} from 'styles/layout'
import { shade, lighten } from 'polished'

export const Container = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: ${theme.spacing.xl};

    box-shadow: 0 12px 12px 0 ${lighten(0.5, theme.colors.secondary)};
    border-radius: 1.6rem;

    color: ${shade(0.9, theme.colors.ice)};
    background: ${theme.colors.ice};

    & + & {
      margin-top: 2.5rem;
    }
  `}
`

export const Wrapper = styled.div`
  ${lessThan('l')(css`
    display: flex;
  `)}
`

export const Title = styled.h2`
  margin-bottom: 5rem;
  text-align: center;
`

export const TitleWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 0 2.5rem;

  text-align: center;

  strong[data-title='true'] {
    text-align: left;
  }

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.s};

    ${lessThan('l')(css`
      display: flex;
      flex-direction: column;

      border-right: 1px solid ${lighten(0.7, theme.colors.secondary)};

      strong + strong {
        border-top: 1px solid ${lighten(0.7, theme.colors.secondary)};
      }

      strong {
        display: flex;
        align-items: center;
        justify-content: right;

        padding-right: 2rem;

        min-height: 100px;
        width: 100%;
      }
    `)}
  `}
`

export const ContentWrapper = styled.div`
  ${lessThan('l')(css`
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
  `)}
`

export const Content = styled.div`
  span {
    text-align: center;
  }

  ${({ theme }) => css`
    span.ok {
      color: ${theme.colors.success};
    }

    ${greaterThan('l')(css`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;

      align-items: center;
      gap: 0 2.5rem;

      margin-top: 1rem;
      padding-top: 1rem;

      border-top: 1px solid ${lighten(0.7, theme.colors.secondary)};

      span[data-title='true'] {
        font-weight: ${theme.fonts.weight.bold};
        text-align: left;
      }

      span:not([data-title='true']) {
        border-left: 1px solid;
      }
    `)}

    ${lessThan('l')(css`
      display: flex;
      flex-direction: column;

      span + span {
        border-top: 1px solid ${lighten(0.7, theme.colors.secondary)};
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        min-height: 100px;
        min-width: 200px;
      }
    `)}
  `}
`
