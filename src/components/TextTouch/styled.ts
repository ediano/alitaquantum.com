import styled, { css } from 'styled-components'
import { lighten } from 'polished'

export const Container = styled.div`
  visibility: hidden;

  &[data-toggle='true'] {
    visibility: visible;
  }

  min-width: 200px;

  position: absolute;
  top: -5px;
  left: 50%;
  z-index: 9;

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
  position: absolute;
  top: -7.5%;
  right: 10px;

  border: none !important;
  margin-top: 0 !important;

  ${({ theme }) => css`
    font-size: 2rem;

    background: ${lighten(0.05, theme.colors.secondary)};
    color: ${theme.colors.white};
    border-radius: ${theme.spacing.xxs};
    padding: ${theme.spacing.xxs} ${theme.spacing.xs} 0 !important;
  `}

  transform: translateY(-50%);
`
