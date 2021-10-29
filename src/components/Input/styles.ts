import styled, { css } from 'styled-components'

import { KeyColors } from 'styles/theme'

export type Props = {
  bg?: KeyColors
  color?: KeyColors
  isValeu?: boolean
}

export const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 75px;

  display: flex;
  align-items: center;

  ${({ theme, bg, color }) => css`
    font-size: ${theme.fonts.sizes.s};
    background: ${theme.colors[bg || 'transparent']};
    color: ${theme.colors[color || 'secondary']};
  `}
`

export const Label = styled.label<Props>`
  position: absolute;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);

  background: #fff;
  transition: 0.2s;

  ${({ theme, isValeu }) => css`
    font-size: ${theme.fonts.sizes.xs};

    ${isValeu &&
    css`
      z-index: 1;
      top: -10%;
    `}
  `}
`

export const Input = styled.input<Props>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;

  ${({ theme, color }) => css`
    background: transparent;
    color: ${theme.colors[color || 'secondary']};
    font-size: ${theme.fonts.sizes.s};
  `}

  &:focus ~ ${Label} {
    z-index: 1;
    top: -10%;
  }
`

export const WrapperIcon = styled.span`
  width: 40px;
  height: 100%;
  display: block;

  background-repeat: no-repeat;
  background-position: 50%;
`
