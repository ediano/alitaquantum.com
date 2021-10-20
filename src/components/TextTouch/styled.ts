import styled, { css } from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  min-width: 200px;

  position: absolute;
  top: -5px;
  left: 50%;

  text-align: center;

  transition: 0.2s;

  transform: translate(-50%, -110%);

  ${({ theme }) => css`
    background: ${lighten(0.05, theme.colors.secondary)};
    color: ${theme.colors.white};
    padding: ${theme.spacing.s} ${theme.spacing.xs};
    border-radius: ${theme.spacing.xxs};

    &::before {
      content: '';

      position: absolute;
      bottom: 1px;
      left: 50%;

      border-top: 10px solid ${lighten(0.05, theme.colors.secondary)};
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;

      transform: translate(-50%, 100%);
    }
  `}
`

export const Close = styled.button`
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-top: -15px;

  ${({ theme }) => css`
    font-size: 2rem;

    background: ${lighten(0.05, theme.colors.secondary)};
    color: ${theme.colors.white};
    padding: ${theme.spacing.xxs} ${theme.spacing.s} 0;
    border-radius: ${theme.spacing.xxs};
  `}

  transform: translateY(-50%);
`
