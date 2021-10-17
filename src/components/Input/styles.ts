import styled, { css } from 'styled-components'

export const Container = styled.input`
  width: 100%;
  height: 42px;
  line-height: 42px;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xs};
  `}
`
