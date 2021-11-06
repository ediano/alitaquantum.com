import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import { lessThan, Container as ContainerBase } from 'styles/layout'
import { Input as InputBase } from 'components/Input'

export const Main = styled.main`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.whiteIce};
  `}
`

export const Container = styled.div`
  width: 100%;
  max-width: 992px;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: 0 auto;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

export const Message = styled.span`
  display: block;

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

export const Block = styled.div`
  ${({ theme }) => css`
    margin: ${theme.spacing.xxl} 0;
  `}
`

export const Input = styled(InputBase)`
  ${({ theme, color }) => css`
    color: ${theme.colors.secondary};
    border-radius: ${theme.spacing.xs};
    border: 1px solid ${lighten(0.5, theme.colors.secondary)};

    ${!color || color === 'secondary'
      ? css`
          border: 1px solid ${lighten(0.5, theme.colors.secondary)};
        `
      : css`
          border: 1px solid ${theme.colors.error};
        `}
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

export const AdvancedOptionsContainer = styled(ContainerBase)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${({ theme }) => css`
    gap: ${theme.spacing.xl};
  `}

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
  `)}
`

const cssOptions = css`
  ${({ theme }) => css`
    border-radius: ${theme.spacing.m};
    padding: ${theme.spacing.l};
  `}
`

export const OptionBlock = styled.div`
  ${({ theme }) => css`
    & + & {
      padding-top: ${theme.spacing.m};
      margin-top: ${theme.spacing.m};
      /* border-top: 1px solid ${lighten(0.5, theme.colors.secondary)}; */
    }
  `}
`

export const OptionEmail = styled.div`
  ${cssOptions}
`

export const OptionAddress = styled.div`
  ${cssOptions}
`

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
