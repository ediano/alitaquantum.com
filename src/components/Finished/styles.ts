import styled, { css } from 'styled-components'
import { lighten, shade, transparentize } from 'polished'
import { MdDoneAll } from 'react-icons/md'
import { BsArrowDown } from 'react-icons/bs'

import { lessThan } from 'styles/layout'

export const BlockPrimary = styled.div`
  position: relative;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.s};
  `}
`

export const IconDoneAll = styled(MdDoneAll)`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;

  display: block;
  margin: 0 auto;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
    margin-bottom: ${theme.spacing.xxl};
  `}
`

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 5rem;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.m};
    color: ${lighten(0.25, theme.colors.secondary)};
  `}
`

export const FromTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 10rem;
  margin-bottom: 10rem;
`

export const Item = styled.span`
  display: flex;
  align-items: center;
  text-transform: uppercase;

  ${({ theme }) => css`
    border-radius: ${theme.spacing.xxs};
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};
    padding-right: ${theme.spacing.xs};
  `}
`

export const Strong = styled.strong`
  ${({ theme }) => css`
    border-right: 1px solid ${lighten(0.5, theme.colors.secondary)};
    padding: ${theme.spacing.xs};
    margin-right: ${theme.spacing.xs};
    color: ${theme.colors.white};

    &.from {
      background: ${theme.colors.secondary};
    }

    &.to {
      background: ${shade(0.1, theme.colors.primary)};
    }
  `}
`

export const IconArrowDown = styled(BsArrowDown)`
  width: 6.5rem;
  height: 6.5rem;

  margin: 1rem 0;

  ${({ theme }) => css`
    color: ${theme.colors.gray};
    padding: ${theme.spacing.s};
  `}
`

export const WrapperShared = styled.div`
  margin-top: 10rem;
  padding-top: 5rem;

  ${({ theme }) => css`
    border-top: 1px solid ${lighten(0.5, theme.colors.secondary)};
  `}
`

export const BlockSecondary = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.secondary};
    margin-top: ${theme.spacing.xxl};
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.spacing.s};
    color: ${theme.colors.white};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

export const DetalheId = styled.span`
  display: block;
  text-align: center;
  margin-bottom: 5rem;
`

export const WrapperBlockDetalhes = styled.div`
  ${({ theme }) => css`
    & + & {
      margin-top: 2.5rem;
      padding-top: 2.5rem;
      border-top: 1px solid ${transparentize(0.75, theme.colors.white)};
    }
  `}
`

export const BlockDetalhes = styled.div`
  display: grid;
  grid-template-columns: 125px 1fr;
  overflow: hidden;
`

export const Subtitle = styled.strong`
  display: block;
  margin-bottom: 2.5rem;

  ${({ theme }) => css`
    &.primary {
      font-size: ${theme.fonts.sizes.s};
    }
  `}
`

export const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ theme }) => css`
    &.primary {
      margin-bottom: 2.5rem;
      font-weight: ${theme.fonts.weight.bold};
    }
  `}
`
