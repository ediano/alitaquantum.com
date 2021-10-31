import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { MdEmail } from 'react-icons/md'

import { useExchange } from 'context/exchange'
import Api from 'services/ApiService'

import { Exchange } from 'components/Exchange'
import { Button } from 'components/Button'
import { ConfirmTransaction } from 'components/ConfirmTransaction'

import * as S from './styles'

export type DataCreateTransaction = {
  fromAmount: string
  toAmount: string
  fromCurrency: string
  fromNetwork: string
  toCurrency: string
  toNetwork: string
  address: string
  extraId?: string
  refundAddress?: string
  refundExtraId?: string
  contactEmail?: string
  transactionSpeedForecast: string
}

type ValidatingProps = {
  address: string
  isAddress?: boolean
  extraId?: string
  refundAddress?: string
  refundExtraId?: string
  contactEmail?: string
}

type HandlerClickValidateAddress = {
  address: string
  currency: string
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
  const { dataFlow, estimatedAmount, transactionSpeedForecast } = useExchange()
  const [dataCreateTransaction, setDataCreateTransaction] =
    useState<DataCreateTransaction>({} as DataCreateTransaction)

  const [validating, setValidating] = useState<ValidatingProps>(
    {} as ValidatingProps
  )
  const [confirmTransaction, setConfirmTransaction] = useState(false)
  const [isAdvancedOptions, setIsAdvancedOptions] = useState(false)
  const [isRefundAddress, setIsRefundAddress] = useState(true)
  const [isValidatingAddress, setIsValidatingAddress] = useState(false)

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      if (name === 'address' && !value) {
        setValidating({ address: '', isAddress: undefined })
        setConfirmTransaction(false)
      }

      if (name === 'address' || name === 'extraId') {
        setTimeout(() => {
          setValidating((state) => ({ ...state, [name]: value }))
        }, 500)
      }

      setDataCreateTransaction((state) => ({ ...state, [name]: value }))
    },
    []
  )

  const handlerClickValidateAddress = useCallback(
    (props: HandlerClickValidateAddress) => {
      const { address, currency } = props

      async function handler() {
        try {
          const response = await Api.getValidateAddress({ address, currency })

          setIsRefundAddress(response.data.result)
        } catch (err) {
          setIsRefundAddress(false)
        }
      }

      if (!!address && !!currency) handler()
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

        setValidating((state) => ({
          ...state,
          isAddress: response.data.result || undefined
        }))
      } catch (err) {
        setValidating((state) => ({
          ...state,
          isAddress: undefined
        }))
      }
    }

    if (validating.address) handler()
  }, [validating, dataFlow])

  useEffect(() => {
    if (!isAdvancedOptions) {
      setDataCreateTransaction((state) => ({
        ...state,
        refundAddress: '',
        refundExtraId: '',
        contactEmail: ''
      }))
    }
  }, [isAdvancedOptions])

  useEffect(() => {
    const { fromAmount, fromCurrency, fromNetwork, toCurrency, toNetwork } =
      dataFlow
    setDataCreateTransaction((state) => ({
      ...state,
      fromAmount,
      fromCurrency,
      fromNetwork,
      toCurrency,
      toNetwork,
      toAmount: estimatedAmount,
      transactionSpeedForecast,
      extraId: state.extraId || ''
    }))
  }, [dataFlow, estimatedAmount, transactionSpeedForecast])

  useEffect(() => {
    const { address, isAddress } = validating
    const isUndefined = !address && isAddress === undefined

    setIsValidatingAddress(isUndefined || !!isAddress)
  }, [validating])

  return (
    <>
      <S.Main>
        <S.Container>
          <S.Message>Preencha os dados para trocar as moedas.</S.Message>

          <Exchange />
          <S.BlockWrapper>
            <S.Block>
              <S.Input
                defaultValue=""
                isValue={!!validating.address}
                name="address"
                onChange={handlerInputChange}
                color={isValidatingAddress ? 'secondary' : 'error'}
                label={`SEU ENDEREÇO ${dataFlow.toName?.toUpperCase() || ''}`}
              />
            </S.Block>

            {dataFlow.toId && (
              <S.Block>
                <S.Input
                  defaultValue=""
                  isValue={!!validating.extraId}
                  name="extraId"
                  onChange={handlerInputChange}
                  label="OPCIONAL: ID/MENO/TAG"
                />
              </S.Block>
            )}
          </S.BlockWrapper>

          <S.WrapperButton>
            <Button
              uppercase
              title="Proximo"
              background={!isValidatingAddress ? 'primary' : 'secondary'}
              onClick={() => setConfirmTransaction(true)}
              disabled={isValidatingAddress}
            />
          </S.WrapperButton>

          <S.AdvancedOptionsText
            onClick={() => setIsAdvancedOptions(!isAdvancedOptions)}
          >
            Opções avançadas
          </S.AdvancedOptionsText>
        </S.Container>
      </S.Main>

      {confirmTransaction && validating.address && validating.isAddress && (
        <ConfirmTransaction
          setToggle={setConfirmTransaction}
          {...dataCreateTransaction}
        />
      )}

      {isAdvancedOptions && (
        <S.AdvancedOptions>
          <S.AdvancedOptionsContainer>
            <S.OptionEmail>
              <S.OptionBlock>
                <S.OptionMessage>
                  <S.OptionTitle>Receba notificações por e-mail</S.OptionTitle>
                </S.OptionMessage>

                <S.Input
                  defaultValue=""
                  type="email"
                  isValue={!!dataCreateTransaction.contactEmail}
                  name="contactEmail"
                  onChange={handlerInputChange}
                  placeholder="SEU EMAIL"
                  icon={MdEmail}
                />

                <S.OptionMessage>
                  Fique por dentro em todo que acontece durante o processo de
                  troca, seja notificado por e-mail em cada uma das etapa
                  (moedas recebidas, trocando e envidas).
                </S.OptionMessage>
              </S.OptionBlock>
            </S.OptionEmail>

            <S.OptionAddress>
              <S.OptionBlock>
                <S.OptionMessage>
                  <S.OptionTitle>Endereço da moeda de origem</S.OptionTitle>
                </S.OptionMessage>

                <S.Input
                  defaultValue=""
                  isValue={!!dataCreateTransaction.refundAddress}
                  name="refundAddress"
                  onChange={handlerInputChange}
                  color={isRefundAddress ? 'secondary' : 'error'}
                  placeholder={`SEU ENDEREÇO ${
                    dataFlow.fromName?.toUpperCase() || ''
                  } PARA REEMBOLSO`}
                  srcImage={dataFlow.fromImage}
                />

                <S.OptionMessage>
                  Em casos de falhas durante a troca, um reembolso automatico
                  pode ser iniciado sem que você precise intervir manualmente.
                </S.OptionMessage>
              </S.OptionBlock>

              {dataFlow.fromId && (
                <S.OptionBlock>
                  <S.Input
                    defaultValue=""
                    isValue={!!dataCreateTransaction.refundExtraId}
                    name="refundExtraId"
                    onChange={handlerInputChange}
                    placeholder="OPCIONAL: ID/MENO/TAG PARA REEMBOLSO"
                    srcImage={dataFlow.fromImage}
                  />

                  <S.OptionMessage>
                    Certifique-se se o local de reembolso exige uma das
                    propriedades
                  </S.OptionMessage>
                </S.OptionBlock>
              )}

              <Button
                title="Validar endereço"
                uppercase
                onClick={() =>
                  handlerClickValidateAddress({
                    address: dataCreateTransaction.refundAddress || '',
                    currency: dataCreateTransaction.fromCurrency || ''
                  })
                }
                style={{ width: 'auto', marginLeft: 'auto' }}
              />
            </S.OptionAddress>
          </S.AdvancedOptionsContainer>
        </S.AdvancedOptions>
      )}
    </>
  )
}
