import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled(ContainerBase)`
  position: relative;
  z-index: 1;

  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => css`
    transform: translateY(-${theme.spacing.xxl});
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.spacing.m};
    box-shadow: 0 -4px 12px -4px ${theme.colors.white};
  `}
`

export const Wrapper = styled.div`
  display: flex;
  width: 50%;
  flex: 1 0 50%;

  ${lessThan(1050)(css`
    width: 100%;
    flex: 1 0 100%;
  `)}
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;

  align-items: center;
  justify-content: center;
  justify-items: center;

  ${({ theme }) => css`
    gap: 2rem;
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.spacing.m};
    box-shadow: 0 12px 12px -2px ${lighten(0.5, theme.colors.secondary)};
  `}
`

export const Figure = styled.figure`
  position: relative;
  width: 150px;
  height: 150px;
`

export const Description = styled.p`
  ${({ theme }) => css`
    margin-bottom: ${theme.spacing.l};
    color: ${theme.colors.secondary};
    font-weight: ${theme.fonts.weight.light};
    font-size: ${theme.fonts.sizes.sm};
    font-family: ${theme.fonts.family.secondary};
  `}

  ${lessThan(1050)(css`
    text-align: center;
  `)}
`

export const Link = styled.a`
  ${({ theme }) => css`
    display: blok;
    margin-left: ${theme.spacing.s};
    color: ${theme.colors.primary};
    border-bottom: 1px dashed;
  `}
`
