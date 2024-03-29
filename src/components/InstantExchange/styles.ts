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

    &[data-alert='true'] {
      box-shadow: 0 0 12px -2px ${shade(0.1, theme.colors.alert)};
    }
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

export const WrapperNetwork = styled.div`
  display: grid;
  grid-template-columns: 1fr 130px;
  text-align: left;
`

export const Network = styled.span`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xxs};
    border-bottom-right-radius: ${theme.border.xs};
    border-bottom-left-radius: ${theme.border.xs};

    &.from {
      color: ${theme.colors.white};
      background: ${lighten(0.2, theme.colors.secondary)};
    }

    &.to {
      color: ${theme.colors.secondary};
      background: ${theme.colors.primary};
    }
  `}
`

export const MessageError = styled.span`
  ${({ theme }) => css`
    &::before {
      position: absolute;
      right: 0;
      left: 0;
      border-radius: ${theme.spacing.xxs};
      transform: translateY(-100%);
      z-index: 9999;
      background: ${lighten(0.25, theme.colors.alert)};
      text-align: center;
      width: 100%;
    }

    &::before {
      content: attr(data-alert);
    }
  `}
`
