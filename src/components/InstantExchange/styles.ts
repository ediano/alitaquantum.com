import styled, { css } from 'styled-components'
import { lighten, shade } from 'polished'

import { lessThan } from 'styles/layout'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;

  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.l} 0;

    ${lessThan('m')(css`
      flex-direction: column;
    `)}
  `}
`

export const WrapperBlock = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;

  ${({ theme }) => css`
    border-radius: ${theme.border.xs};
    border: 1px solid ${theme.colors.transparent};

    &[data-alert='true'] {
      border: 1px solid ${theme.colors.alert};
    }
  `};
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
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.l};
  `}
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;

  transform: rotate(90deg);

  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.l};
  `}

  ${lessThan('m')(css`
    transform: rotate(0);
  `)}
`

export const Alert = styled.span`
  position: absolute;
  text-align: left;
  visibility: hidden;

  transform: translateY(-100%);

  &[data-alert='true'] {
    visibility: visible;
  }

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

export const Network = styled.span`
  margin-left: auto;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    padding: 0 ${theme.spacing.xxs};
    border-bottom-right-radius: ${theme.border.xs};
    border-bottom-left-radius: ${theme.border.xs};

    &.from {
      background: ${lighten(0.2, theme.colors.secondary)};
    }

    &.to {
      background: ${shade(0.2, theme.colors.primary)};
    }
  `}
`
