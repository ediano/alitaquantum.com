import styled, { css } from 'styled-components'
import { lessThan, greaterThan } from 'styles/layout'

export const Container = styled.div``

export const Title = styled.strong`
  display: block;
  text-align: center;

  margin-right: 1rem;

  ${({ theme }) => css`
    color: ${theme.colors.secondary};
    font-size: ${theme.fonts.sizes.s};
  `}

  ${lessThan('s')(css`
    margin-right: 0;
    margin-bottom: 1rem;
  `)}
`

export const Description = styled.span`
  display: block;
  text-align: center;

  margin: 1rem 0;

  ${({ theme }) => css`
    color: ${theme.colors.secondary};
  `}
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${greaterThan('s')(css`
    flex-wrap: wrap;
  `)}

  ${lessThan('s')(css`
    display: block;
  `)}
`

export const Anchor = styled.a`
  display: inline-block;
  transition: 0.4s;

  ${({ theme }) => css`
    svg {
      width: 3.2rem;
      height: 3.2rem;
      color: ${theme.colors.gray};
    }

    &:hover svg {
      color: ${theme.colors.primary};
    }
  `}

  ${greaterThan('s')(css`
    & + & {
      margin-left: 1rem;
    }
  `)}

  ${lessThan('s')(css`
    margin: 1rem;
  `)}
`

export const WrapperIcon = styled.div`
  text-align: center;
`
