import styled, { css } from 'styled-components'
import { lighten, shade } from 'polished'
import { MdDoneAll } from 'react-icons/md'
import { BsArrowDown } from 'react-icons/bs'

import { lessThan } from 'styles/layout'

export const Container = styled.section`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const BlockPrimary = styled.section`
  position: relative;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    margin-top: ${theme.spacing.xxl};
    padding: ${theme.spacing.xxl};
    padding-top: 7.5rem;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

export const IconDoneAll = styled(MdDoneAll)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
    background: ${theme.colors.white};
    padding: ${theme.spacing.s};
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
    color: ${theme.colors.grey};
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

export const BlockSecondary = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.secondary};
    margin-top: ${theme.spacing.xxl};
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`
