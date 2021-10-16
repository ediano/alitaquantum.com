import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'

import { Container, lessThan, greaterThan } from 'styles/layout'

import { OptionsLayout } from '.'

type Props = {
  layout?: OptionsLayout
}

export const Nav = styled.nav<Props>`
  position: relative;
  height: 64px;
  z-index: 999;

  ${({ theme, layout }) =>
    layout !== 'default' &&
    css`
      background: ${theme.colors.white};
      box-shadow: ${theme.shadow};
    `}
`

export const Wrapper = styled(Container)`
  height: 64px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2rem;
`

export const LogoText = styled.div`
  ${lessThan(500)(css`
    display: none;
  `)}
`

export const Alita = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: 600;
  `}
`

export const Quantum = styled.span`
  margin-left: 5px;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
  `}
`

export const Logo = styled.a`
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
  grid-template-columns: auto auto;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.sizes.m};

    &:hover ${Alita} {
      color: ${shade(0.25, theme.colors.primary)};
    }

    &:hover ${Quantum} {
      background: ${shade(0.25, theme.colors.primary)};
    }
  `}
`

export const WrapperItens = styled.div`
  position: relative;
  display: flex;
`

export const Itens = styled.ul`
  display: flex;

  ${lessThan('m')(css`
    flex-direction: column;

    position: absolute;
    top: 64px;
    right: 0;
    z-index: 2;

    width: 300px;
    border-radius: 0.5rem;

    transition: 0.2s;
    visibility: hidden;
    transform: translateY(-15%);

    &.open {
      visibility: visible;
      transform: translateY(0%);
    }

    ${({ theme }) => css`
      background: ${theme.colors.white};
      box-shadow: 0 0 10px 0px rgb(0 0 0 / 25%);
    `}
  `)}
`

export const Item = styled.li`
  ${({ theme }) => css`
    ${lessThan('m')(css`
      border-top: 1px solid ${lighten(0.75, theme.colors.black)};
    `)}
  `}

  ${greaterThan('m')(css`
    & + & {
      margin-left: 2rem;
    }
  `)}
`

export const ItemLink = styled.a`
  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.xs};

    &:hover {
      color: ${shade(0.25, theme.colors.primary)};
    }
  `}

  ${lessThan('m')(css`
    display: block;
    padding: 1.5rem;
  `)}
`

export const Button = styled.button`
  cursor: pointer;
  display: none;

  background: transparent;
  height: 54px;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};
    color: ${theme.colors.primary};

    &:hover {
      color: ${shade(0.25, theme.colors.primary)};
    }
  `}

  ${lessThan('m')(css`
    display: flex;
    align-items: center;
  `)}
`

export const CloseMenu = styled.button`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  transition: 0.3s;

  width: 100vh;
  height: 100vh;

  opacity: 0;
  background: #000;
  visibility: hidden;

  &.open {
    opacity: 0.25;
    visibility: visible;
  }

  ${greaterThan('m')(css`
    display: none;
  `)}
`
