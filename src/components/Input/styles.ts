import styled, { css } from 'styled-components'

import { KeyColors } from 'styles/theme'

export type Props = {
  background?: KeyColors
  color?: KeyColors
  isValeu?: boolean
}

export const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  ${({ theme, background, color }) => css`
    font-size: ${theme.fonts.sizes.s};
    background: ${theme.colors[background || 'white']};
    color: ${theme.colors[color || 'secondary']};
    padding: 0 ${theme.spacing.xs};
  `}
`

export const Label = styled.label<Props>`
  position: absolute;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);

  transition: 0.2s;

  ${({ theme, color }) => css`
    left: ${theme.spacing.xs};
    font-size: ${theme.fonts.sizes.xs};
    color: ${theme.colors[color || 'secondary']};
  `}

  ${({ isValeu }) =>
    isValeu &&
    css`
      z-index: 1;
      top: -12.5%;
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
    top: -12.5%;
  }
`

export const WrapperIcon = styled.span`
  width: 40px;
  height: 100%;
  display: block;

  background-repeat: no-repeat;
  background-position: 50%;
`
