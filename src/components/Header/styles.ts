import styled, { css } from 'styled-components'

type Props = {
  isHero?: boolean
}

export const Container = styled.header<Props>`
  position: relative;

  ${({ theme, isHero }) =>
    isHero &&
    css`
      box-shadow: 0 0 12px 0 ${theme.colors.secondary};
    `}
`
