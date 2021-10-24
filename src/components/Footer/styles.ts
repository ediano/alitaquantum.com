import styled, { css } from 'styled-components'
import { shade } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.footer`
  ${({ theme }) => css`
    padding: ${theme.calc(theme.spacing.xxl, 2)} 0;
    background: ${shade(0.5, theme.colors.secondary)};
    box-shadow: 0 0 25px 0 ${theme.colors.secondary};
  `}
`

export const Wrapper = styled(ContainerBase)`
  display: grid;
  grid-template-columns: 100px 1fr;
  justify-items: end;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xxl};
    color: ${theme.colors.whiteIce};
  `}

  ${lessThan('m')(css`
    grid-template-columns: 1fr;
    justify-items: center;
  `)}
`

export const Block = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.l};

    & + & {
      border-top: 1px solid ${theme.colors.secondary};
    }
  `}
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
