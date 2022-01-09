import styled, { css } from 'styled-components'
import { lessThan } from 'styles/layout'

export const Container = styled.div``

export const WrapperCircle = styled.div`
  gap: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;

  ${lessThan('l')(css`
    gap: 30px;
    grid-template-columns: 1fr 1fr;
  `)}

  ${lessThan('s')(css`
    gap: 50px;
    grid-template-columns: 1fr;
  `)}
`

export const WrapperStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`

export const Circle = styled.span`
  position: relative;
  border-radius: 50%;

  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    &::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      height: 50px;
      width: 50px;
    }

    &[data-loading='true']::after {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: ${theme.colors.primary};
      animation: spin 1s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    }

    &[data-loading='false']::after {
      border: 5px solid rgba(0, 0, 0, 0.1);
    }

    &[data-loading='false'][data-verifying='true']::after {
      background: ${theme.colors.primary};
    }
  `}
`
