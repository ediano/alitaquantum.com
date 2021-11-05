import styled, { css } from 'styled-components'
import { transparentize, lighten, shade } from 'polished'
import { Input as InputBase } from 'components/Input'

type Props = {
  alert?: boolean
  network?: 'from' | 'to'
  loading?: string
}

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const WrapperBlock = styled.div<Props>`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;

  ${({ theme, alert }) =>
    alert &&
    css`
      border-radius: ${theme.border.xs};
      box-shadow: 0 0 4px 1px ${theme.colors.alert};
    `};
`

export const Input = styled(InputBase)<Props>`
  ${({ theme, disabled }) =>
    disabled &&
    css`
      color: ${theme.colors.white};
      background: ${transparentize(0.25, theme.colors.secondary)};
    `}

  ${({ theme, loading }) =>
    loading === '' &&
    css`
      &::before {
        content: '';
        position: absolute;
        border: 4px solid ${transparentize(0.5, theme.colors.secondary)};
        border-left-color: ${theme.colors.primary};
        border-radius: 100%;
        width: 25px;
        height: 25px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`

export const InputBlock = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;

  box-shadow: 0 2px 12px -4px #000;

  ${({ theme }) => css`
    border-radius: ${theme.border.xs};
    border-bottom-right-radius: 0;
  `}
`

export const WrapperDetails = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: ${theme.spacing.l} 0;
  `}
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;

  margin-left: auto;

  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.l};
  `}
`

export const Alert = styled.span<Props>`
  position: absolute;
  text-align: left;
  visibility: hidden;
  transform: translateY(-100%);

  ${({ alert }) =>
    alert &&
    css`
      visibility: visible;
    `}

  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    padding: 0 ${theme.spacing.xxs};
  `}
`

export const AlertFixedRate = styled.div`
  position: relative;
`

export const AlertFixedRateText = styled.span`
  cursor: pointer;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xs};
    color: ${theme.colors.text};
    border-bottom: 1px dashed;
  `}
`

export const Network = styled.span<Props>`
  margin-left: auto;

  ${({ theme, network }) => css`
    color: ${theme.colors.white};
    padding: 0 ${theme.spacing.xxs};
    border-bottom-right-radius: ${theme.border.xs};
    border-bottom-left-radius: ${theme.border.xs};

    background: ${network === 'from'
      ? lighten(0.2, theme.colors.secondary)
      : shade(0.2, theme.colors.primary)};
  `}
`
