import { useState, useCallback, useEffect, ChangeEvent } from 'react'

import { useExchange } from 'context/exchange'
import Api from 'services/ApiService'

import { Exchange } from 'components/Exchange'
import { AnchorButton } from 'components/AnchorButton'

import * as S from './styles'

type DataCreateTransaction = {
  fromAmount: string
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  address: string
  extraId?: string
  refundAddress?: string
  refundExtraId?: string
  contactEmail?: string
}

type ValidatingProps = {
  address: string
  extraId: string
}

const DATA_CREATE_TRANSACTION_SESSION_STORAGE =
  'alitaquantum.com@data-create-transaction'
export const DATA_CREATE_TRANSACTION = {
  get: (): DataCreateTransaction => {
    const data = sessionStorage.getItem(DATA_CREATE_TRANSACTION_SESSION_STORAGE)
    return !!data && JSON.parse(data)
  },
  set: (data: DataCreateTransaction) => {
    sessionStorage.setItem(
      DATA_CREATE_TRANSACTION_SESSION_STORAGE,
      JSON.stringify(data)
    )
  }
}

export const ExchangeLayout = () => {
  const { dataFlow } = useExchange()

  const [dataCreateTransaction, setDataCreateTransaction] =
    useState<DataCreateTransaction>({} as DataCreateTransaction)

  const [validating, setValidating] = useState<ValidatingProps>(
    {} as ValidatingProps
  )
  const [isValidateAddress, setIsValidateAddress] = useState(false)

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target
      if (name === 'address' || name === 'extraId') {
        setValidating((state) => ({ ...state, [name]: value }))
      }
      setDataCreateTransaction((state) => ({ ...state, [name]: value }))
    },
    []
  )

  useEffect(() => {
    async function handler() {
      try {
        const response = await Api.getValidateAddress({
          address: validating.address,
          currency: dataFlow.toCurrency
        })

        setIsValidateAddress(response.data.result)
      } catch (err) {}
    }

    if (validating.address) handler()
  }, [validating, dataFlow])

  return (
    <S.Main>
      <S.Wrapper>
        <S.Message>
          Você esta trocando <S.Strong>{dataFlow.fromName}</S.Strong> por{' '}
          <S.Strong>{dataFlow.toName}</S.Strong>
        </S.Message>

        <Exchange />

        <S.BlockWrapper>
          <S.Block>
            {!validating.address || isValidateAddress ? (
              <S.LinkText href="http://bit.ly/35jYNcF">
                Você ainda não tem carteira?
              </S.LinkText>
            ) : (
              <S.Text>Endereço inválido!</S.Text>
            )}
            <S.InputBlock isAddress={!validating.address || isValidateAddress}>
              <S.Input
                name="address"
                onChange={handlerInputChange}
                isAddress={!validating.address || isValidateAddress}
              />
              <S.Label
                htmlFor="address"
                isValue={!!validating.address}
                isAddress={!validating.address || isValidateAddress}
              >
                SEU ENDEREÇO <strong>{dataFlow.toName?.toUpperCase()}</strong>
              </S.Label>
            </S.InputBlock>
          </S.Block>

          {dataFlow.toId && (
            <S.Block>
              <S.InputBlock>
                <S.Input name="extraId" onChange={handlerInputChange} />
                <S.Label htmlFor="extraId" isValue={!!validating.extraId}>
                  OPCIONAL: <strong>ID/MENO/TAG</strong>
                </S.Label>
              </S.InputBlock>
            </S.Block>
          )}

          <div>Ppções avançadas</div>
        </S.BlockWrapper>

        {!!validating.address && isValidateAddress && (
          <AnchorButton title="Proximo" href="/exchange/tsx" />
        )}
      </S.Wrapper>
    </S.Main>
  )
}
