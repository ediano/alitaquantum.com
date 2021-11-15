import styled, { css } from 'styled-components'

export const Container = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
  `}
`

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`

export const Title = styled.h1``

export const WrapperBody = styled.div`
  > * {
    margin-top: 2.5rem;
  }

  > ol li {
    list-style: auto;
    margin-left: 3rem;
  }

  li + li {
    margin-top: 1rem;
  }

  > blockquote {
    padding: 1rem 3rem;
    margin-left: 3rem;
    border-left: 1px solid;
  }

  > a {
    color: #444;
    border-bottom: 1px dashed;
  }
`
