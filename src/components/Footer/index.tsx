import Link from 'next/link'
import Image from 'next/image'

import { site } from 'config/site'

import navLinks from 'components/Navbar/content'

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
                  src={site.logo}
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={site.logo}
                />
              </a>
            </Link>
          </S.Logo>
        </S.Block>

        <S.Block>
          <S.ListLinks>
            {navLinks.map(
              ({ href, title }) =>
                href !== '/' && (
                  <Link key={href} href={href} passHref>
                    <S.Anchor>{title}</S.Anchor>
                  </Link>
                )
            )}
          </S.ListLinks>
        </S.Block>
      </S.Wrapper>
    </S.Container>
  )
}
