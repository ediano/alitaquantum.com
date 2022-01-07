import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { lessThan } from 'styles/layout'

export const Container = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    padding-bottom: ${theme.spacing.xxl};
    background: ${theme.colors.white};
    border-radius: ${theme.spacing.s};
  `}
`

export const Title = styled.span`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.m};
    color: ${theme.colors.grey};

    ${lessThan('s')(css`
      font-size: ${theme.fonts.sizes.s};
    `)}
  `}
`

export const Block = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.m};
  `}
`

export const Card = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacing.l};
  `}
`

export const CardTitle = styled.span`
  display: block;
`

export const CardAmount = styled.strong`
  display: block;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xl};

    ${lessThan('m')(css`
      font-size: ${theme.fonts.sizes.m};
    `)}

    ${lessThan('s')(css`
      font-size: ${theme.fonts.sizes.s};
    `)}
  `}
`

export const CardWallet = styled.strong`
  display: block;
`

export const CardTime = styled.strong`
  display: block;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.s};
  `}
`

export const Text = styled.span``

export const WrapperButton = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  ${({ theme }) => css`
    gap: ${theme.spacing.m};
    margin-top: ${theme.spacing.m};
    padding: ${theme.spacing.m} 0;
  `}

  ${lessThan('s')(css`
    grid-template-columns: 1fr;
  `)}
`

export const WrapperCheckbox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export const Checkbox = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.5rem;
`

export const Anchor = styled.a`
  ${({ theme }) => css`
    color: ${shade(0.25, theme.colors.primary)};

    &:hover {
      color: ${shade(0.5, theme.colors.primary)};
    }
  `}
`

export const WrapperSpinner = styled.div`
  margin-top: 5rem;
`
