import styled, { css } from 'styled-components'

import { KeyColors } from 'styles/theme'

export type Props = {
  isIconOrImage?: boolean
  bg?: KeyColors
  color?: KeyColors
}

export const Container = styled.div<Props>`
  position: relative;
  width: 100%;
  height: 75px;

  ${({ theme, isIconOrImage }) => css`
    font-size: ${theme.fonts.sizes.s};

    ${isIconOrImage &&
    css`
      padding-left: 40px;
    `}
  `}
`

export const Input = styled.input<Props>`
  width: 100%;
  height: 100%;

  ${({ theme, bg, color }) => css`
    background: ${theme.colors[bg || 'transparent']};
    color: ${theme.colors[color || 'white']};
    font-size: ${theme.fonts.sizes.s};
  `}
`

export const WrapperIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;

  width: 20px;
  height: 20px;
  display: block;

  background-repeat: no-repeat;
  transform: translateY(-50%);
`
