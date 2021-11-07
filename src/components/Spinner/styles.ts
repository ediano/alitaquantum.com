import styled, { css } from 'styled-components'

import { Props } from '.'

export const Container = styled.div<Props>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, heightBase, circle }) => css`
    height: ${heightBase || '30px'};

    &:before {
      content: '';
      position: absolute;
      border: 8px solid rgba(0, 0, 0, 0.1);
      border-left-color: ${theme.colors.primary};
      border-radius: 50%;
      width: ${circle?.width || '30px'};
      height: ${circle?.height || '30px'};
      animation: spin 1s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }
  `}
`
