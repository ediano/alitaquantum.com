import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { MdEmail } from 'react-icons/md'

import { useExchange } from 'context/exchange'
import ChangeNow from 'services/ChangeNowService'

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

type HandlerClickValidateAddress = {
  address: string
  currency: string
}

export const ExchangeLayout = () => {
  const { dataFlow, estimatedAmount, transactionSpeedForecast } = useExchange()
  const [dataCreateTransaction, setDataCreateTransaction] =
    useState<DataCreateTransaction>({} as DataCreateTransaction)

  const [address, setAddress] = useState('')
  const [confirmTransaction, setConfirmTransaction] = useState(false)
  const [isAdvancedOptions, setIsAdvancedOptions] = useState(false)
  const [isRefundAddress, setIsRefundAddress] = useState(true)
  const [isValidatingAddress, setIsValidatingAddress] = useState(false)
  const [isError, setIsError] = useState(false)

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      setTimeout(() => {
        if (name === 'address' && !value) {
          setConfirmTransaction(false)
        }

        if (name === 'address') {
          setAddress(value)
        }

        setDataCreateTransaction((state) => ({ ...state, [name]: value }))
      }, 500)
    },
    []
  )

  const handlerClickValidateAddress = useCallback(
    (props: HandlerClickValidateAddress) => {
      const { address, currency } = props

      async function handler() {
        try {
          const response = await ChangeNow.getValidateAddress({
            address,
            currency
          })

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
        const response = await ChangeNow.getValidateAddress({
          address,
          currency: dataFlow.toCurrency
        })

        setIsValidatingAddress(response.data.result)
      } catch (err) {
        setIsValidatingAddress(false)
      }
    }

    if (address) {
      handler()
    } else {
      setIsValidatingAddress(false)
    }
  }, [dataFlow, address])

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
    if (address) {
      setIsError(!isValidatingAddress)
    } else {
      setIsError(false)
    }
  }, [address, isValidatingAddress])

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
                isValue={!!address}
                name="address"
                onChange={handlerInputChange}
                color={!isError ? 'secondary' : 'error'}
                label={`SEU ENDEREÇO ${dataFlow.toName?.toUpperCase() || ''}`}
              />
            </S.Block>

            {dataFlow.toId && (
              <S.Block>
                <S.Input
                  defaultValue=""
                  isValue={!!dataCreateTransaction.extraId}
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
              background={isValidatingAddress ? 'primary' : 'secondary'}
              onClick={() => setConfirmTransaction(true)}
              disabled={!isValidatingAddress}
            />
          </S.WrapperButton>

          <S.AdvancedOptionsText
            onClick={() => setIsAdvancedOptions(!isAdvancedOptions)}
          >
            Opções avançadas
          </S.AdvancedOptionsText>

          {confirmTransaction && address && isValidatingAddress && (
            <ConfirmTransaction
              setToggle={setConfirmTransaction}
              {...dataCreateTransaction}
            />
          )}
        </S.Container>
      </S.Main>

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
