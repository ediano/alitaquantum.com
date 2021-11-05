import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { KeyColors } from 'styles/theme'

export type Props = {
  background?: KeyColors
  color?: KeyColors
  colorIcon?: KeyColors
  isValue?: boolean
  isIcon?: boolean
  disabled?: boolean
}

export const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  ${({ theme, background, color, disabled }) => css`
    font-size: ${theme.fonts.sizes.s};
    background: ${theme.colors[background || 'white']};
    color: ${theme.colors[color || 'secondary']};
    padding: 0 ${theme.spacing.s};

    ${disabled &&
    css`
      color: ${theme.colors.white};
      background: ${transparentize(0.25, theme.colors.secondary)};
    `}
  `}
`

export const Label = styled.label<Props>`
  position: absolute;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);

  transition: 0.2s;

  ${({ theme, color }) => css`
    left: ${theme.spacing.s};
    font-size: ${theme.fonts.sizes.xxs};
    color: ${theme.colors[color || 'secondary']};
  `}

  ${({ theme, isIcon }) =>
    isIcon &&
    css`
      left: calc(30px + ${theme.spacing.s});
    `}

  ${({ isValue }) =>
    isValue &&
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

    &::placeholder {
      font-size: ${theme.fonts.sizes.xxs};
      transform: translateY(-2px);
    }
  `}

  &:focus ~ ${Label} {
    z-index: 1;
    top: -12.5%;
  }
`

export const WrapperIcon = styled.span<Props>`
  display: flex;
  align-items: center;

  font-size: 1.8rem;

  width: 30px;
  height: 100%;

  background-repeat: no-repeat;
  background-position: 0 50%;

  ${({ theme, color }) =>
    color && theme.colors[color]
      ? css`
          color: ${theme.colors[color || 'secondary']};
        `
      : css`
          color: ${color};
        `}
`
