import styled, { css } from 'styled-components'
import NextImage from 'next/image'
import { Container as ContainerBase } from 'styles/layout'

export const Container = styled.section`
  position: absolute;
  inset: 0;
  z-index: 1;

  min-height: 100vh;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
  `}
`

export const Image = styled(NextImage)`
  opacity: 0.1;
`

export const Wrapper = styled(ContainerBase)`
  position: relative;
  z-index: 0;

  height: calc(100% - 64px);
  margin-top: 64px;

  display: grid;
  grid-template-areas:
    'content form'
    'footer footer';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;

  ${({ theme }) => css`
    grid-gap: ${theme.spacing.m};
  `}
`

const gridWrapperCss = css`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    padding: ${theme.spacing.xl};
  `}
`

export const Content = styled.div`
  ${gridWrapperCss}
  grid-area: content;
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};
    font-family: ${theme.fonts.family.nunito};
    color: ${theme.colors.secondary};
    font-weight: ${theme.fonts.weight.regular};
    line-height: ${theme.spacing.xxl};
  `}
`

export const Form = styled.div`
  ${gridWrapperCss}
  grid-area: form;
`

export const Footer = styled.div`
  ${gridWrapperCss}
  grid-area: footer;

  min-height: 120px;
`
