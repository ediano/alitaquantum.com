import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'
import { Container, lessThan, greaterThan } from 'styles/layout'

type Props = {
  isHero?: boolean
}

export const Nav = styled.nav<Props>`
  position: relative;
  height: 100px;
  z-index: 999;

  ${({ theme, isHero }) =>
    isHero
      ? css`
          background: ${theme.colors.transparent};
        `
      : css`
          background: ${theme.colors.white};
          box-shadow: 0 4px 12px 0 ${theme.colors.secondary};
        `}
`

export const Wrapper = styled(Container)<Props>`
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 2rem;

  ${({ theme, isHero }) =>
    isHero &&
    css`
      border-bottom: 1px solid ${lighten(0.6, theme.colors.secondary)};
    `}
`

export const Alita = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: 600;
  `}
`

export const Quantum = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${theme.colors.primary};
  `}
`

export const Logo = styled.a`
  display: grid;
  grid-gap: 0.5rem;
  align-items: center;
  justify-items: center;
  grid-template-columns: auto auto;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.sizes.m};
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
    top: 100px;
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

export const ItemLink = styled.a<Props>`
  ${({ theme }) =>
    css`
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weight.semiBold};
      color: ${theme.colors.secondary};

      &:hover {
        color: ${shade(0.1, theme.colors.primary)};
      }

      ${lessThan('m')(css`
        display: block;
        padding: 1.5rem;
        color: ${theme.colors.secondary};
      `)}
    `}
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
    opacity: 0.5;
    visibility: visible;
  }

  ${greaterThan('m')(css`
    display: none;
  `)}
`
