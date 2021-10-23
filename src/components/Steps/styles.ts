import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'
import { GiFootsteps } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'
import { Container as ContainerBase, lessThan } from 'styles/layout'

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} ${theme.spacing.xxl}
      ${theme.calc(theme.spacing.xxl, 2)};
    color: ${theme.colors.white};
    background: ${shade(0.5, theme.colors.secondary)};
    box-shadow: 5px 5px 14px -8px ${shade(0.9, theme.colors.secondary)};
  `}
`

export const Wrapper = styled(ContainerBase)`
  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};

    ${lessThan('m')(css`
      padding: ${theme.spacing.xxl} 0;
    `)}
  `}
`

export const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};

    ${lessThan('l')(css`
      font-size: ${theme.fonts.sizes.m};
    `)}
  `}
`

export const FootStepsIcon = styled(GiFootsteps)`
  margin-left: auto;

  ${({ theme }) => css`
    width: 150px;
    height: 150px;
    font-size: ${theme.fonts.sizes.xxl};
    color: ${theme.colors.secondary};
  `}

  ${lessThan('s')(css`
    display: none;
  `)}
`

export const Itens = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  text-align: center;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    margin: ${theme.spacing.xxl} auto;
  `}

  ${lessThan('l')(css`
    grid-template-columns: 1fr;
  `)}
`

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};

    font-size: ${theme.fonts.sizes.m};
    font-family: ${theme.fonts.family.secondary};

    & + & {
      border-left: 1px solid ${theme.colors.secondary};
    }

    ${lessThan('l')(css`
      border-left: none !important;

      & + & {
        border-top: 1px solid ${theme.colors.secondary};
      }

      padding: ${theme.spacing.m};
    `)}
  `}
`

export const Position = styled.span`
  ${({ theme }) => css`
    padding: ${theme.spacing.m};
    color: ${lighten(0.5, theme.colors.secondary)};
  `}

  ${lessThan('l')(css`
    padding: 0;
  `)}
`

export const Description = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    min-height: ${theme.calc(theme.spacing.xxl, 2)};
    padding: ${theme.spacing.l};
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weight.semiBold};
    background: ${shade(0.25, theme.colors.primary)};
    border-radius: ${theme.spacing.xs};
  `}
`

export const SecureIcon = styled(MdSecurity)`
  position: absolute;
  top: -25px;

  width: 50px;
  height: 50px;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.xxl};
    font-weight: ${theme.fonts.weight.semiBold};
  `}
`
