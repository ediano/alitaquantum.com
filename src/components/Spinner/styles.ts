import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    border: 8px solid rgba(0, 0, 0, 0.1);
    border-left-color: ${theme.colors.primary};
    border-radius: 50%;
    width: 250px;
    height: 250px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `}
`
