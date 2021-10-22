import styled, { css } from 'styled-components'
import NextImage from 'next/image'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.section`
  position: relative;
  z-index: 1;

  min-height: 100%;

  margin-top: -64px;
  padding-top: 64px;

  ${({ theme }) => css`
    background: ${theme.colors.whiteIce};
  `}
`

export const Image = styled(NextImage)`
  opacity: 0.1;
`

export const Wrapper = styled(ContainerBase)`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  min-height: 850px;

  ${lessThan('l')(css`
    flex-direction: column;
    justify-content: center;
  `)}
`

const gridWrapperCss = css`
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} ${theme.spacing.m};
    margin: ${theme.spacing.xxl} auto;

    ${lessThan('l')(css`
      width: 70%;
      margin: 0 auto;
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
      text-align: center;
    `)}

    ${lessThan('m')(css`
      width: 100%;
      padding: ${theme.spacing.xxl} ${theme.spacing.m};
    `)}
  `}
`

export const Content = styled.div`
  ${gridWrapperCss}
`

export const Title = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};
    font-family: ${theme.fonts.family.secondary};
    color: ${theme.colors.secondary};
    font-weight: ${theme.fonts.weight.regular};
    line-height: ${theme.spacing.xxl};

    ${lessThan('m')(css`
      font-size: ${theme.fonts.sizes.m};
      line-height: ${theme.spacing.l};
    `)}
  `}
`

export const Form = styled.div`
  ${gridWrapperCss}
`

export const Footer = styled.div`
  text-align: center;
  width: 100%;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} 0;
    margin-top: ${theme.spacing.xxl};
  `}
`
