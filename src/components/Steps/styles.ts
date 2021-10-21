import styled, { css } from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  position: relative;
  z-index: 1;

  margin-top: -100px;
  margin-bottom: 100px;
  padding: 120px;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${shade(0.5, theme.colors.secondary)};
    border-radius: ${theme.spacing.m};
    box-shadow: 5px 5px 14px -8px ${shade(0.9, theme.colors.secondary)};
  `}
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  ${({ theme }) => css`
    gap: ${theme.spacing.xxl};
  `}
`

export const Item = styled.div`
  ${({ theme }) => css`
    & + & {
      margin-left: 1px solid ${theme.colors.secondary};
    }
  `}
`

export const Title = styled.h2``

export const Subtitle = styled.h3``

export const Footer = styled.div``
