import { useState, useCallback, useEffect, ChangeEvent } from 'react'

import { useExchange } from 'context/exchange'
import Api from 'services/ApiService'

import { Exchange } from 'components/Exchange'
import { Input } from 'components/Input'
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
  extraId?: string
  refundAddress?: string
  refundExtraId?: string
  contactEmail?: string
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
        }, 500)
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
            <S.InputBlock
              color={
                validating.address && !isValidateAddress ? 'error' : 'secondary'
              }
            >
              <Input
                isValue={!!validating.address}
                name="address"
                onChange={handlerInputChange}
                color={
                  validating.address && !isValidateAddress
                    ? 'error'
                    : 'secondary'
                }
                label={`SEU ENDEREÇO ${dataFlow.toName?.toUpperCase()}`}
              />
            </S.InputBlock>
          </S.Block>

          {dataFlow.toId && (
            <S.Block>
              <S.InputBlock>
                <Input
                  isValue={!!validating.extraId}
                  name="extraId"
                  onChange={handlerInputChange}
                  label="OPCIONAL: ID/MENO/TAG"
                />
              </S.InputBlock>
            </S.Block>
          )}
        </S.BlockWrapper>

        {!!validating.address && isValidateAddress && (
          <S.WrapperButton>
            <AnchorButton title="Proximo" href="/exchange/tsx" />
          </S.WrapperButton>
        )}

        <S.AdvancedOptionsText>Opções avançadas</S.AdvancedOptionsText>
      </S.Container>

      <S.AdvancedOptions>
        <S.DataOptions>
          <S.Block>
            <S.InputBlock>
              <Input
                isValue={!!dataCreateTransaction.contactEmail}
                name="contactEmail"
                onChange={handlerInputChange}
                label="SEU EMAIL"
              />
            </S.InputBlock>
          </S.Block>

          <S.Block>
            <S.InputBlock>
              <Input
                isValue={!!dataCreateTransaction.refundAddress}
                name="refundAddress"
                onChange={handlerInputChange}
                label={`SEU ENDEREÇO ${dataFlow.fromName?.toUpperCase()} PARA REEMBOLSO`}
              />
            </S.InputBlock>
          </S.Block>

          {dataFlow.fromId && (
            <S.Block>
              <S.InputBlock>
                <Input
                  isValue={!!dataCreateTransaction.refundExtraId}
                  name="refundExtraId"
                  onChange={handlerInputChange}
                  label="OPCIONAL: ID/MENO/TAG PARA REEMBOLSO"
                />
              </S.InputBlock>
            </S.Block>
          )}
        </S.DataOptions>
      </S.AdvancedOptions>
    </S.Main>
  )
}
