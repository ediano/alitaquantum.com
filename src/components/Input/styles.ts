import styled, { css } from 'styled-components'

export const Container = styled.input`
  width: 100%;
  height: 75px;
  line-height: 75px;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.s};
  `}
`
