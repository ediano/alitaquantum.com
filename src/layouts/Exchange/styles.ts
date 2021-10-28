import styled, { css } from 'styled-components'
import { lessThan } from 'styles/layout'

import { lighten, shade } from 'polished'
import { Input as InputBase } from 'components/Input'

export const Main = styled.main`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.whiteIce};
  `}
`

export const Container = styled.div`
  width: 100%;
  max-width: 800px;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: ${theme.calc(theme.spacing.xxl, 2)} auto;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

export const Message = styled.span`
  display: block;

  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.l};
    font-size: ${theme.fonts.sizes.sm};
  `}
`

export const Strong = styled.strong``

type LabelProps = {
  isValue?: boolean
}

type Address = {
  isAddress?: boolean
}

export const BlockWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

export const Block = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacing.xxl} 0;
  `}
`

export const InputBlock = styled.div<Address>`
  position: relative;
  width: 100%;
  z-index: 1;

  ${({ theme, isAddress }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.xs};
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};
    padding: 0 ${theme.spacing.m};

    ${isAddress === undefined || isAddress
      ? css`
          border: 1px solid ${lighten(0.5, theme.colors.secondary)};
        `
      : css`
          border: 1px solid ${theme.colors.error};
        `}
  `}
`

export const Label = styled.label<LabelProps & Address>`
  position: absolute;
  top: 50%;
  z-index: -1;
  transform: translateY(-50%);

  background: #fff;
  transition: 0.2s;
  font-size: 1.4rem;

  ${({ theme, isValue, isAddress }) => css`
    left: ${theme.spacing.m};
    padding: 0 ${theme.spacing.xxs};
    border-radius: ${theme.spacing.xxs};

    ${isValue &&
    css`
      top: -10%;
    `}

    ${isAddress !== undefined &&
    !isAddress &&
    css`
      color: ${theme.colors.error};
    `}
  `}
`

export const Input = styled(InputBase)<Address>`
  background: transparent;

  ${({ theme, isAddress }) =>
    isAddress === undefined || isAddress
      ? css`
          color: ${theme.colors.secondary};
        `
      : css`
          color: ${theme.colors.error};
        `}

  &:focus ~ ${Label} {
    top: -10%;
    z-index: 0;
  }
`

export const Text = styled.a`
  display: block;
  text-align: right;

  ${({ theme }) => css`
    color: ${theme.colors.error};
  `}
`
