import styled, { css } from 'styled-components'
import { Input as InputBase } from 'components/Input'

export const Container = styled.datalist``

export const Option = styled.option``

export const InputSelect = styled(InputBase)`
  line-height: normal;

  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xs};
    background: ${theme.colors.secondary};
    color: ${theme.colors.white};
    font-size: ${theme.fonts.sizes.xs};
  `}
`
