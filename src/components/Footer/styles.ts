import styled, { css } from 'styled-components'
import { shade } from 'polished'
import {
  Container as ContainerBase,
  lessThan,
  greaterThan
} from 'styles/layout'

export const Container = styled.footer`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} 0;
    background: ${shade(0.5, theme.colors.secondary)};
    box-shadow: 0 0 25px 0 ${theme.colors.secondary};
  `}
`

export const Wrapper = styled(ContainerBase)`
  display: flex;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xxl};
    color: ${theme.colors.whiteIce};
  `}

  ${lessThan('m')(css`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
  `)}
`

export const Block = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.l};
  `}

  ${lessThan('l')(css`
    &.hide-l {
      display: none;
    }
  `)}
`

export const WrapperBlocks = styled.div`
  display: flex;

  ${({ theme }) => css`
    border-top: 1px solid ${theme.colors.secondary};
  `}

  ${greaterThan('m')(css`
    margin-left: auto;
  `)}
`

export const Logo = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`

export const ListLinks = styled.div``

export const Anchor = styled.a`
  display: table;

  transition: 0.2s;

  ${({ theme }) => css`
    color: ${theme.colors.whiteIce};

    & + & {
      margin-top: ${theme.spacing.s};
    }

    &:hover {
      color: ${shade(0.3, theme.colors.white)};
    }
  `}
`

export const ListLinksTickers = styled(ListLinks)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${({ theme }) => css`
    column-gap: ${theme.spacing.l};
  `}
`

export const AnchorTickers = styled(Anchor)`
  margin-top: 0 !important;

  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.s};
  `}
`
