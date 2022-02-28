import styled, { css } from 'styled-components'
import { lighten, shade } from 'polished'
import { lessThan } from 'styles/layout'

export const Title = styled.h1`
  display: block;
  text-align: center;

  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.l};
    font-size: ${theme.fonts.sizes.sm};
  `}
`

export const BlockWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
`

export const ExchangeWrapper = styled.div`
  max-width: 550px;
  margin: 0 auto;
`

export const Block = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacing.xxl} 0;
  `}
`

export const WrapperButton = styled.div`
  margin-bottom: 50px;
`

export const AdvancedOptionsText = styled.span`
  display: table;
  margin: 0 auto;
  cursor: pointer;
  border-bottom: 1px dashed;

  ${({ theme }) => css`
    color: ${lighten(0.25, theme.colors.secondary)};
  `}
`

export const AdvancedOptions = styled.section`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl} 0;
  `}
`

export const AdvancedOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${({ theme }) => css`
    gap: ${theme.spacing.xl};
  `}

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}
`

export const OptionBlock = styled.div`
  ${({ theme }) => css`
    & + & {
      padding-top: ${theme.spacing.m};
      margin-top: ${theme.spacing.m};
    }
  `}
`

export const OptionEmail = styled.div``

export const OptionAddress = styled.div``

export const OptionMessage = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.xs};
    margin-bottom: ${theme.spacing.m};
    font-size: ${theme.fonts.sizes.xxs};
  `}
`

export const OptionTitle = styled.strong`
  ${({ theme }) => css`
    color: ${lighten(0.15, theme.colors.secondary)};
  `}
`

export const AlertKYCAML = styled.div`
  margin-top: 2.5rem;

  ${({ theme }) => css`
    padding: ${theme.spacing.xs};
    border-radius: ${theme.spacing.xxs};
    background: ${lighten(0.2, theme.colors.alert)};

    a {
      margin-left: 0.5rem;
      color: ${shade(0.25, theme.colors.primary)};
      font-weight: 500;
    }
  `}
`
