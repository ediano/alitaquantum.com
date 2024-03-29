import Link from 'next/link'
import Image from 'next/image'

import { site } from 'config/site'

import { Social } from 'components/Social'

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

          <Social />
        </S.Block>

        <S.WrapperBlocks>
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

              <S.Trustpilot
                href="https://www.trustpilot.com/review/alitaquantum.com"
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                Avalia-nos em
                <Image
                  alt="Avalia-nos em Trustpilot"
                  src="/img/logos/trustpilot.svg"
                  width={99}
                  height={24}
                  placeholder="blur"
                  blurDataURL="/img/logos/trustpilot.svg"
                />
              </S.Trustpilot>
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
