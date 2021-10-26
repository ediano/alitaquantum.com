import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { Input as InputBase } from 'components/Input'

type LabelProps = {
  isValue: boolean
}

export const Wrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

export const InputBlock = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.xs};
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};
    margin: ${theme.spacing.xxl} 0;
    padding: 0 ${theme.spacing.m};
  `}
`

export const Label = styled.label<LabelProps>`
  position: absolute;
  top: 50%;
  z-index: -1;
  transform: translateY(-50%);

  background: #fff;
  transition: 0.2s;

  ${({ theme, isValue }) => css`
    left: ${theme.spacing.m};
    padding: 0 ${theme.spacing.xxs};
    border-radius: ${theme.spacing.xxs};

    ${isValue &&
    css`
      top: -10%;
    `}
  `}
`

export const Input = styled(InputBase)`
  background: transparent;

  &:focus ~ ${Label} {
    top: -10%;
    z-index: 0;
  }
`
