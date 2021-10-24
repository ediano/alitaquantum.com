import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'
import { Container as ContainerBase } from 'styles/layout'
import { Input as InputBase } from 'components/Input'

type LabelProps = {
  isValue: boolean
}

export const Container = styled.section`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} 0;
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xxl};
  `}
`

export const ExchangeWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const Block = styled.div`
  width: 100%;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xxl};
  `}
`

export const InputBlock = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
    border-radius: ${theme.spacing.xs};
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};
    margin: ${theme.spacing.xxl} 0;
    padding: 0 ${theme.spacing.m};
    box-shadow: 0 0 8px 0 ${lighten(0.5, theme.colors.secondary)};
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

export const Figure = styled.figure`
  position: absolute;
  inset: 0;

  ${({ theme }) => css`
    background: ${shade(0.25, theme.colors.primary)};
  `}
`
