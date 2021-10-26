import { useState, useCallback, ChangeEvent, ReactNode } from 'react'

import { useExchange } from 'context/exchange'

import * as S from './styles'

type DataValidatingProps = {
  wallet: string
  idWallet: string
  email: string
}

type Props = {
  children: ReactNode
}

export const ValidatingTransaction = ({ children }: Props) => {
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
    <>
      {children}

      <S.Wrapper>
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
      </S.Wrapper>
    </>
  )
}
