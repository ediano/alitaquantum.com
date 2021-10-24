import { useState, useCallback, ChangeEvent } from 'react'
import Image from 'next/image'

import { useExchange } from 'context/exchange'
import { Exchange } from 'components/Exchange'

import { AnchorButton } from 'components/AnchorButton'

import * as S from './styles'

type DataValidatingProps = {
  wallet: string
  idWallet: string
  email: string
}

export const ValidatingTransaction = () => {
  const { selectedCurrency } = useExchange()
  const [dataValidating, setDataValidating] = useState<DataValidatingProps>(
    {} as DataValidatingProps
  )

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      setDataValidating((state) => ({ ...state, [name]: value }))
    },
    []
  )

  return (
    <S.Container>
      <S.Wrapper>
        <S.ExchangeWrapper>
          <Exchange color="#000000">
            <S.Block>
              <S.InputBlock>
                <S.Input name="wallet" onChange={handlerInputChange} />
                <S.Label htmlFor="wallet" isValue={!!dataValidating.wallet}>
                  SEU ENDEREÇO {selectedCurrency?.toName?.toUpperCase()}
                </S.Label>
              </S.InputBlock>

              <S.InputBlock>
                <S.Input name="idWallet" onChange={handlerInputChange} />
                <S.Label htmlFor="idWallet" isValue={!!dataValidating.idWallet}>
                  OPCIONAL: ID/MENO/TAG/HASH
                </S.Label>
              </S.InputBlock>

              <S.InputBlock>
                <S.Input name="email" onChange={handlerInputChange} />
                <S.Label htmlFor="email" isValue={!!dataValidating.email}>
                  SEU E-MAIL
                </S.Label>
              </S.InputBlock>

              <AnchorButton
                title="Trocar"
                href="/depositar"
                background="secondary"
                style={{ maxWidth: '300px', margin: '50px auto 0 auto' }}
              />
            </S.Block>
          </Exchange>
        </S.ExchangeWrapper>
      </S.Wrapper>

      <S.Figure>
        <Image
          src="/img/pages/nakamoto_white.svg"
          layout="fill"
          placeholder="blur"
          blurDataURL="/img/pages/nakamoto_white.svg"
        />
      </S.Figure>
    </S.Container>
  )
}
