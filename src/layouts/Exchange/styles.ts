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
  max-width: 800px;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    margin: ${theme.calc(theme.spacing.xxl, 2)} auto;
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

export const Strong = styled.strong``

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

export const AdvancedOptions = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl} 0;
  `}
`

export const DataOptions = styled(ContainerBase)`
  ${({ theme }) => css`
    background: ${theme.colors.white};
  `}
`
