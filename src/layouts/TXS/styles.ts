import styled, { css } from 'styled-components'
import { MdDoneAll, MdError } from 'react-icons/md'

import { lessThan } from 'styles/layout'

export const Container = styled.section`
  position: relative;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl};
    background: ${theme.colors.whiteIce};
  `}
`

export const Wrapper = styled.section`
  width: 100%;
  max-width: 992px;
  margin: 0 auto;
`

export const Block = styled.div`
  height: 50vh;
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
    margin-top: ${theme.spacing.xxl};
    padding: ${theme.spacing.xxl};
    padding-top: 7.5rem;
    border-radius: ${theme.spacing.s};

    ${lessThan('s')(css`
      padding: ${theme.spacing.m};
    `)}
  `}
`

const icon = css`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;

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
