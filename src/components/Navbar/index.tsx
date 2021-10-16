import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MdMenu } from 'react-icons/md'

import content from './content'

import * as S from './styles'

export type OptionsLayout = 'default'

type Props = {
  layout?: OptionsLayout
}

export const Navbar = ({ layout = 'default' }: Props) => {
  const [active, setActive] = useState(false)

  return (
    <S.Nav layout={layout}>
      <S.Wrapper>
        <Link href="/" passHref>
          <S.Logo>
            <Image
              src="/img/logo_reverse.png"
              width={54}
              height={54}
              layout="fixed"
              quality={100}
              placeholder="blur"
              blurDataURL="/img/logo_reverse.png"
            />

            <S.LogoText>
              <S.Alita>Alita</S.Alita>
              <S.Quantum>Quantum</S.Quantum>
            </S.LogoText>
          </S.Logo>
        </Link>

        <S.WrapperItens>
          <S.Itens className={active ? 'open' : 'close'}>
            {content.map((item) => (
              <S.Item key={item.href}>
                <Link href={item.href} passHref>
                  <S.ItemLink>{item.title}</S.ItemLink>
                </Link>
              </S.Item>
            ))}
          </S.Itens>

          <S.Button onClick={() => setActive(!active)}>
            <MdMenu />
          </S.Button>

          <S.CloseMenu
            className={active ? 'open' : 'close'}
            onClick={() => setActive(false)}
          />
        </S.WrapperItens>
      </S.Wrapper>
    </S.Nav>
  )
}
