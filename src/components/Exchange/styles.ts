import styled, { css } from 'styled-components'
import { transparentize, lighten, shade } from 'polished'
import { Input as InputBase } from 'components/Input'

type WrapperBlockProps = {
  alert?: boolean
}

type NetworkProps = {
  network: 'from' | 'to'
}

export const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const WrapperSelected = styled.div<{ color?: string }>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ theme, color }) => css`
    border-radius: ${theme.border.s};
    padding: ${theme.spacing.xxl};
    background: ${transparentize(0.45, color || theme.colors.secondary)};
    box-shadow: 4px 4px 12px 0 ${theme.colors.secondary};
  `}
`

export const WrapperBlock = styled.div<WrapperBlockProps>`
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  ${({ theme, alert }) => css`
    & + & {
      margin-top: ${theme.spacing.m};
    }

    ${alert &&
    css`
      border-radius: ${theme.border.xs};
      border-bottom-right-radius: 0;
      box-shadow: 0 0 4px 1px ${theme.colors.alert};
    `}
  `};
`

export const InputBlock = styled.div<WrapperBlockProps>`
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;

  border-top: 1px solid transparent;

  ${({ theme, alert }) => css`
    ${!alert
      ? css`
          border-radius: ${theme.border.xs};
          border-bottom-right-radius: 0;
        `
      : css`
          border-radius: 0;
          border-top: 1px solid ${transparentize(0.75, theme.colors.secondary)};
        `}
  `}
`

export const Input = styled(InputBase)`
  ${({ theme, disabled }) => css`
    padding: 0 ${theme.spacing.xs};

    ${disabled &&
    css`
      color: ${theme.colors.white};
      background: ${transparentize(0.25, theme.colors.secondary)};
    `};
  `}
`

export const InputSelect = styled(InputBase)`
  line-height: normal;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xs};
    background: ${shade(0.25, theme.colors.secondary)};
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.xs};
  `}
`

export const WrapperDetails = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: ${theme.spacing.m} 0;
  `}
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;

  margin-left: auto;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.m};
  `}
`

export const Alert = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
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
    color: ${lighten(0.75, theme.colors.text)};
    border-bottom: 1px dashed;
  `}
`

export const Network = styled.span<NetworkProps>`
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
