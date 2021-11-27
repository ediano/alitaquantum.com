import styled, { css } from 'styled-components'
import { shade, transparentize } from 'polished'
import { MdCloseFullscreen } from 'react-icons/md'

import { lessThan } from 'styles/layout'

export const Block = styled.div`
  width: 90%;
  margin: 0 auto;
`

export const Title = styled.h1`
  text-align: center;
`

export const Description = styled.p`
  text-align: center;
  margin-top: 1.5rem;
`

export const WrapperExchange = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 50px 0;
  padding: 0 0 3rem 0;

  ${({ theme }) => css`
    border-top: 1px solid ${transparentize(0.75, theme.colors.secondary)};
    border-bottom: 1px solid ${transparentize(0.75, theme.colors.secondary)};
  `}
`

export const MoreCurrencyOptions = styled.a`
  margin-top: 50px;

  ${({ theme }) => css`
    color: ${shade(0.25, theme.colors.primary)};
    font-size: ${theme.fonts.sizes.s};

    &:hover {
      color: ${shade(0.5, theme.colors.primary)};
    }
  `}
`

export const List = styled.ol`
  margin-top: 2.5rem;
  margin-left: 2.5rem;

  li {
    list-style: unset;
  }

  li + li {
    margin-top: 2rem;
  }

  li span {
    display: block;
  }
`

export const WrapperShared = styled.div`
  margin-top: 5rem;

  ${({ theme }) => css`
    padding: ${theme.spacing.xxl} 0;
    border-top: 1px solid ${transparentize(0.75, theme.colors.secondary)};
    border-bottom: 1px solid ${transparentize(0.75, theme.colors.secondary)};
  `}
`

export const TitleIcon = styled.strong`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2.5rem;

  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.sm};
  `}
`

export const IconCloseFullscreen = styled(MdCloseFullscreen)`
  width: 7.5rem;
  height: 7.5rem;
  text-align: right;

  ${({ theme }) => css`
    color: ${theme.colors.primary};
  `}

  ${lessThan('m')(css`
    display: none;
  `)}
`

export const BlockFooter = styled.div`
  margin-top: 5rem;
`

export const FooterContent = styled.div`
  display: grid;
  gap: 5rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  ${lessThan('m')(css`
    grid-template-columns: 1fr 1fr;
  `)}

  ${lessThan('s')(css`
    grid-template-columns: 1fr;
  `)}
`

export const CardSuggestedCoins = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid;

  ${({ theme }) => css`
    color: ${theme.colors.primary};

    &:hover {
      color: ${shade(0.25, theme.colors.primary)};
    }
  `}
`

export const ImageCoin = styled.span`
  width: 40px;
  height: 40px;
  background-size: 40px;
`

export const WrapperCoins = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

export const FooterDescription = styled.p`
  margin-bottom: 2.5rem;
  text-align: center;
`
