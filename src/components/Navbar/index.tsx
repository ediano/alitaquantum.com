import { useState, memo } from 'react'
import Link from 'next/link'
import { MdMenu } from 'react-icons/md'

import content from './content'

import * as S from './styles'

export type Props = {
  isHero?: boolean
}

const Navbar = ({ isHero }: Props) => {
  const [active, setActive] = useState(false)

  return (
    <S.Nav isHero={isHero}>
      <S.Wrapper isHero={isHero}>
        <Link href="/" passHref>
          <S.Logo>
            <S.Alita aria-label="Alita">Alita</S.Alita>
            <S.Quantum aria-label="Quantum">Quantum</S.Quantum>
          </S.Logo>
        </Link>

        <S.WrapperItens>
          <S.Itens className={active ? 'open' : 'close'}>
            {content.map((item) => (
              <S.Item key={item.href}>
                <Link href={item.href} passHref>
                  <S.ItemLink isHero={isHero}>{item.title}</S.ItemLink>
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

export default memo(Navbar)
