import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { Input as InputBase } from 'components/Input'

export const Container = styled.form`
  position: relative;
  width: 90%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  ${({ theme }) => css`
    border-radius: ${theme.border.s};
    padding: ${theme.spacing.xxl};
    background: ${transparentize(0.45, theme.colors.secondary)};
  `}
`

export const WrapperBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;

  height: 42px;
  line-height: 42px;

  ${({ theme }) => css`
    border-radius: ${theme.border.xs};

    & + & {
      margin-top: ${theme.spacing.m};
    }
  `}
`

export const Input = styled(InputBase)`
  ${({ theme, disabled }) => css`
    padding: 0 ${theme.spacing.xs};

    color: ${disabled && theme.colors.white};
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;

  margin-left: auto;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.m};
  `}
`
