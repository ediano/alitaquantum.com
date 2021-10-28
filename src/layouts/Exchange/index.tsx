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
  const [timeoutChange, setTimeoutChange] = useState<any>()

  const [dataCreateTransaction, setDataCreateTransaction] =
    useState<DataCreateTransaction>({} as DataCreateTransaction)

  const [validating, setValidating] = useState<ValidatingProps>(
    {} as ValidatingProps
  )
  const [isValidateAddress, setIsValidateAddress] = useState(false)

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutChange)

      setTimeoutChange(
        setTimeout(() => {
          const { value, name } = event.target

          if (name === 'address' || name === 'extraId') {
            setValidating((state) => ({ ...state, [name]: value }))
          }

          setDataCreateTransaction((state) => ({ ...state, [name]: value }))
        }, 1000)
      )
    },
    [timeoutChange]
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
      <S.Container>
        <S.Message>Preencha os dados para trocar as moedas.</S.Message>

        <Exchange />

        <S.BlockWrapper>
          <S.Block>
            {validating.address && !isValidateAddress && (
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

          <div>
            <span>Opções avançadas</span>

            <div>
              <S.Block>
                <S.InputBlock>
                  <S.Input name="contactEmail" onChange={handlerInputChange} />
                  <S.Label htmlFor="contactEmail">SEU EMAIL</S.Label>
                </S.InputBlock>
              </S.Block>

              <S.Block>
                <S.InputBlock>
                  <S.Input name="refundAddress" onChange={handlerInputChange} />
                  <S.Label htmlFor="refundAddress">
                    SEU ENDEREÇO{' '}
                    <strong>{dataFlow.fromName?.toUpperCase()}</strong> PARA
                    REEMBOLSO
                  </S.Label>
                </S.InputBlock>
              </S.Block>

              {dataFlow.fromId && (
                <S.Block>
                  <S.InputBlock>
                    <S.Input
                      name="refundExtraId"
                      onChange={handlerInputChange}
                    />
                    <S.Label htmlFor="refundExtraId">
                      OPCIONAL: <strong>ID/MENO/TAG</strong> PARA REEMBOLSO
                    </S.Label>
                  </S.InputBlock>
                </S.Block>
              )}
            </div>
          </div>
        </S.BlockWrapper>

        {!!validating.address && isValidateAddress && (
          <AnchorButton title="Proximo" href="/exchange/tsx" />
        )}
      </S.Container>
    </S.Main>
  )
}
