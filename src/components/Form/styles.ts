import styled, { css } from 'styled-components'
import { transparentize, lighten } from 'polished'
import { Input as InputBase } from 'components/Input'
import { Container as TextTouchBase } from 'components/TextTouch/styled'

type WrapperBlockProps = {
  alert?: boolean
}

export const Container = styled.form`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ theme }) => css`
    border-radius: ${theme.border.s};
    padding: ${theme.spacing.xxl};
    background: ${transparentize(0.45, theme.colors.secondary)};
    box-shadow: ${theme.shadow};
  `}
`

export const WrapperBlock = styled.div<WrapperBlockProps>`
  overflow: hidden;

  ${({ theme, alert }) => css`
    & + & {
      margin-top: ${theme.spacing.m};
    }

    ${alert &&
    css`
      border-radius: ${theme.border.xs};
      box-shadow: 0 0 4px 1px ${theme.colors.alert};
    `}
  `}
`

export const InputBlock = styled.div<WrapperBlockProps>`
  overflow: hidden;
  position: relative;
  display: flex;

  border-top: 1px solid transparent;

  ${({ theme, alert }) => css`
    ${!alert
      ? css`
          border-radius: ${theme.border.xs};
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
    background: ${theme.colors.secondary};
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

export const AlertFixedRate = styled.span`
  position: relative;
  cursor: pointer;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xs};
    color: ${lighten(0.75, theme.colors.text)};
    border-bottom: 1px dashed;
  `}

  &:hover ${TextTouchBase} {
    visibility: visible;
  }
`
