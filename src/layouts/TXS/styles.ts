import styled, { css } from 'styled-components'
import { MdDoneAll, MdError } from 'react-icons/md'

import { lessThan } from 'styles/layout'

export const Block = styled.div`
  position: relative;

  width: 100%;

  div {
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  strong {
    margin-bottom: 1.5rem;
  }

  p {
    text-align: center;
    margin: 0 auto;
    max-width: 500px;
  }

  p + p {
    margin-top: 1.5rem;
  }

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.xxl} 0;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m} 0;
    `)}
  `}
`

const icon = css`
  width: 12.5rem;
  height: 12.5rem;

  display: block;
  margin: 0 auto;

  ${({ theme }) => css`
    background: ${theme.colors.white};
    padding: ${theme.spacing.s};
  `}
`

export const IconDoneAll = styled(MdDoneAll)`
  ${icon}

  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}
`

export const IconError = styled(MdError)`
  ${icon}

  ${({ theme }) => css`
    color: ${theme.colors.error};
  `}
`
