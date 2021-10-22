import styled, { css } from 'styled-components'
import { shade, lighten } from 'polished'
import { GiFootsteps } from 'react-icons/gi'
import { MdSecurity } from 'react-icons/md'

export const Container = styled.div`
  position: relative;
  z-index: 1;

  margin-top: -100px;
  margin-bottom: 100px;
  padding: 60px;

  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${shade(0.5, theme.colors.secondary)};
    border-radius: ${theme.spacing.m};
    box-shadow: 5px 5px 14px -8px ${shade(0.9, theme.colors.secondary)};
  `}
`

export const Title = styled.h2`
  display: flex;
  align-items: center;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.l};
  `}
`

export const FootStepsIcon = styled(GiFootsteps)`
  margin-left: auto;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xxl};
  `}
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  text-align: center;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    margin: ${theme.spacing.xxl} auto;
  `}
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
  `}
`

export const Position = styled.span`
  ${({ theme }) => css`
    padding: ${theme.spacing.m};
    color: ${lighten(0.5, theme.colors.secondary)};
  `}
`

export const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    padding: ${theme.spacing.m};
    color: ${theme.colors.white};
    font-weight: ${theme.fonts.weight.semiBold};
    background: ${shade(0.25, theme.colors.primary)};
    border-radius: ${theme.spacing.xs};
  `}
`

export const SecureIcon = styled(MdSecurity)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.l};
    font-weight: ${theme.fonts.weight.semiBold};
    border-radius: ${theme.spacing.xs};
  `}
`
