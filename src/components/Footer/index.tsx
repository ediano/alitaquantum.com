import Link from 'next/link'
import Image from 'next/image'

import { site } from 'config/site'

import { tickers } from 'pages/[ticker]'

import content from './content'

import * as S from './styles'

export const Footer = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <S.Block>
          <S.Logo>
            <Link href="/">
              <a>
                <Image
                  alt="Alita Quantum"
                  src={site.logo}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={site.logo}
                />
              </a>
            </Link>
          </S.Logo>
        </S.Block>

        <S.WrapperBlocks>
          <S.Block className="hide-l">
            <S.ListLinksTickers>
              {tickers.map(({ from, to }) => (
                <Link
                  key={from + to}
                  href={`trocar-${from}-para-${to}`}
                  passHref
                >
                  <S.AnchorTickers>
                    {from.toUpperCase()} para {to.toUpperCase()}
                  </S.AnchorTickers>
                </Link>
              ))}
            </S.ListLinksTickers>
          </S.Block>

          <S.Block>
            <S.ListLinks>
              {content.map(
                ({ href, title }) =>
                  href !== '/' && (
                    <Link key={href} href={href} passHref>
                      <S.Anchor>{title}</S.Anchor>
                    </Link>
                  )
              )}
            </S.ListLinks>

            <S.ListLinks>
              <Link href="/termos-de-uso" passHref>
                <S.Anchor>Termos de uso</S.Anchor>
              </Link>

              <Link href="/politica-de-privacidade" passHref>
                <S.Anchor>Política de privacidade</S.Anchor>
              </Link>
            </S.ListLinks>
          </S.Block>
        </S.WrapperBlocks>
      </S.Wrapper>

      <S.Copy>
        {site.name} © {new Date().getFullYear()}
      </S.Copy>
    </S.Container>
  )
}
