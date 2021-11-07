import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { KeyColors } from 'styles/theme'

export type Props = {
  color?: 'primary' | 'secondary' | 'alert' | 'error'
  colorIcon?: KeyColors
  isValue?: boolean
  isIcon?: boolean
  disabled?: boolean
}

export const Container = styled.div<{ disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  ${({ theme, disabled }) => css`
    font-size: ${theme.fonts.sizes.s};
    background: ${theme.colors.white};
    color: ${theme.colors.secondary};
    padding: 0 ${theme.spacing.s};

    ${disabled &&
    css`
      background: ${transparentize(0.25, theme.colors.secondary)};
    `}

    &[data-isOutline='true'] {
      border: 1px solid ${transparentize(0.75, theme.colors.secondary)};
      border-radius: ${theme.spacing.xs};
    }

    &.alert {
      color: ${theme.colors.alert};

      &[data-isOutline='true'] {
        border: 1px solid ${transparentize(0.5, theme.colors.alert)};
      }
    }

    &.error {
      color: ${theme.colors.error};

      &[data-isOutline='true'] {
        border: 1px solid ${transparentize(0.5, theme.colors.error)};
      }
    }

    &.grey {
      color: ${theme.colors.grey};
    }

    &.primary {
      color: ${theme.colors.secondary};
      background: ${theme.colors.white};
    }

    &.secondary {
      color: ${theme.colors.white};
      background: ${theme.colors.secondary};
    }

    &[data-isLoading='true']::before {
      content: '';
      position: absolute;
      border: 4px solid ${transparentize(0.5, theme.colors.secondary)};
      border-left-color: ${theme.colors.primary};
      border-radius: 100%;
      width: 25px;
      height: 25px;
      animation: spin 1s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }
  `}
`

export const Label = styled.label<Props>`
  position: absolute;
  top: 50%;
  z-index: 0;
  transform: translateY(-50%);

  transition: 0.2s;

  ${({ theme, isValue }) => css`
    && {
      left: ${theme.spacing.s};
      font-size: ${theme.fonts.sizes.xxs};
      color: ${theme.colors.secondary};

      &.primary {
        color: ${theme.colors.secondary};
      }

      &.secondary {
        color: ${theme.colors.white};
      }

      &.grey {
        color: ${theme.colors.grey};
      }

      &.alert {
        color: ${theme.colors.alert};
      }

      &.error {
        color: ${theme.colors.error};
      }

      &[data-isValue='true'] {
        z-index: 1;
        top: -12.5%;
      }

      &[data-isIcon='true'] {
        left: calc(30px + ${theme.spacing.s});
      }
    }
  `}
`

export const Input = styled.input`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;

  ${({ theme }) => css`
    background: transparent;
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.s};

    &::placeholder {
      font-size: ${theme.fonts.sizes.xxs};
      transform: translateY(-2px);
    }

    &.primary {
      color: ${theme.colors.secondary};
    }

    &.grey {
      color: ${theme.colors.white};
    }

    &.secondary {
      color: ${theme.colors.white};
    }

    &.alert {
      color: ${theme.colors.alert};
    }

    &.error {
      color: ${theme.colors.error};
    }
  `}

  &:focus ~ ${Label} {
    position: absolute;
    top: -12.5%;
  }
`
