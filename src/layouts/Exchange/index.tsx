import { useState, useCallback, useEffect, ChangeEvent } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { MdEmail } from 'react-icons/md'

import { MetaSEO } from 'components/MetaSEO'

import { useExchange, Query } from 'context/exchange'
import * as Api from 'services/ApiService'

import { HeroBackground } from 'components/HeroBackground'
import { Exchange } from 'components/Exchange'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
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
  origin: string
}

export const ExchangeLayout = (props: Query) => {
  const { dataFlow, estimatedAmount, transactionSpeedForecast } = useExchange()
  const [dataCreateTransaction, setDataCreateTransaction] =
    useState<DataCreateTransaction>({} as DataCreateTransaction)

  const [address, setAddress] = useState('')
  const [confirmTransaction, setConfirmTransaction] = useState(false)
  const [isDisabledButton, setIsDisabledButton] = useState(true)
  const [isAdvancedOptions, setIsAdvancedOptions] = useState(false)
  const [isRefundAddress, setIsRefundAddress] = useState(true)
  const [isError, setIsError] = useState(false)

  const handlerInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target

      const newValue = value.trim()

      if (name === 'address' && !value) setConfirmTransaction(false)
      if (name === 'address') setAddress(newValue)
      setDataCreateTransaction((state) => ({ ...state, [name]: newValue }))
    },
    []
  )

  const handlerClickValidateAddress = useCallback(
    async (props: HandlerClickValidateAddress) => {
      const { address, currency, origin } = props

      try {
        const response = await Api.getValidateAddress({
          address,
          currency
        })

        if (origin === 'to') {
          setIsError(!!address && !response.data.result)
          setIsDisabledButton(!response.data.result)
        }
        if (origin === 'from') setIsRefundAddress(response.data.result)
      } catch (err) {
        if (origin === 'to') {
          setIsError(true)
          setIsDisabledButton(true)
        }
        if (origin === 'from') setIsRefundAddress(false)
      }
    },
    []
  )

  useEffect(() => {
    if (address) {
      handlerClickValidateAddress({
        address,
        origin: 'to',
        currency: dataFlow.toCurrency
      })
    } else {
      setIsError(false)
    }
  }, [address, dataFlow.toCurrency, handlerClickValidateAddress])

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
    setDataCreateTransaction((state) => ({
      ...state,
      ...dataFlow,
      toAmount: estimatedAmount,
      transactionSpeedForecast,
      extraId: state.extraId || ''
    }))
  }, [dataFlow, estimatedAmount, transactionSpeedForecast])

  console.log({ props })

  return (
    <>
      <MetaSEO
        title="Troca de criptomoeda com taxas mais baixas e sem registro"
        pathUrl={
          props.fromAmount && props.fromName && props.toName
            ? `/trocar?fromAmount=${props.fromAmount}&fromName=${props.fromName}&toName=${props.toName}`
            : '/trocar'
        }
      />

      <HeroBackground>
        <S.Title>Preencha os dados para trocar as moedas.</S.Title>

        <Exchange />

        {dataFlow.fromCurrency === dataFlow.toCurrency && (
          <S.AlertKYCAML>
            Esta transação esta sujeita a verificação KYC/AML.
            <Link href="/kyc-aml">
              <a>Saiba mais!</a>
            </Link>
          </S.AlertKYCAML>
        )}

        <S.BlockWrapper>
          <S.Block>
            <Input
              isOutline
              name="address"
              color={!isError ? 'primary' : 'error'}
              label={`SEU ENDEREÇO ${dataFlow.toName?.toUpperCase() || ''}`}
              input={{
                value: address,
                onChange: handlerInputChange
              }}
            />
          </S.Block>

          {dataFlow.toId && (
            <S.Block>
              <Input
                isOutline
                name="extraId"
                label="OPCIONAL: ID/MENO/TAG"
                input={{
                  value: dataCreateTransaction.extraId,
                  onChange: handlerInputChange
                }}
              />
            </S.Block>
          )}
        </S.BlockWrapper>

        <S.WrapperButton>
          <Button
            uppercase
            title="Proximo"
            background={isDisabledButton ? 'secondary' : 'primary'}
            onClick={() => setConfirmTransaction(true)}
            disabled={isDisabledButton}
          />
        </S.WrapperButton>

        <S.AdvancedOptionsText
          onClick={() => setIsAdvancedOptions(!isAdvancedOptions)}
        >
          Opções avançadas
        </S.AdvancedOptionsText>

        {confirmTransaction && address && !isDisabledButton && (
          <ConfirmTransaction
            setToggle={setConfirmTransaction}
            {...dataCreateTransaction}
          />
        )}

        {isAdvancedOptions && (
          <S.AdvancedOptions>
            <S.AdvancedOptionsContainer>
              <div>
                <S.OptionBlock>
                  <S.OptionMessage>
                    <S.OptionTitle>
                      Receba notificações por e-mail
                    </S.OptionTitle>
                  </S.OptionMessage>

                  <Input
                    isOutline
                    name="contactEmail"
                    icon={{ ico: MdEmail }}
                    input={{
                      type: 'email',
                      placeholder: 'SEU EMAIL'
                    }}
                  />

                  <S.OptionMessage>
                    Fique por dentro em todo que acontece durante o processo de
                    troca, seja notificado por e-mail em cada uma das etapa
                    (moedas recebidas, trocando e envidas).
                  </S.OptionMessage>
                </S.OptionBlock>
              </div>

              <div>
                <S.OptionBlock>
                  <S.OptionMessage>
                    <S.OptionTitle>Endereço da moeda de origem</S.OptionTitle>
                  </S.OptionMessage>

                  <Input
                    isOutline
                    name="refundAddress"
                    color={isRefundAddress ? 'primary' : 'error'}
                    image={dataFlow.fromImage}
                    input={{
                      onChange: handlerInputChange,
                      placeholder: `SEU ENDEREÇO ${
                        dataFlow.fromName?.toUpperCase() || ''
                      } PARA REEMBOLSO`
                    }}
                  />

                  <S.OptionMessage>
                    Em casos de falhas durante a troca, um reembolso automatico
                    pode ser iniciado sem que você precise intervir manualmente.
                  </S.OptionMessage>
                </S.OptionBlock>

                {dataFlow.fromId && (
                  <S.OptionBlock>
                    <Input
                      isOutline
                      name="refundExtraId"
                      image={dataFlow.fromImage}
                      input={{
                        value: dataCreateTransaction.refundExtraId,
                        onChange: handlerInputChange,
                        placeholder: 'OPCIONAL: ID/MENO/TAG PARA REEMBOLSO'
                      }}
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
                      origin: 'from',
                      address: dataCreateTransaction.refundAddress || '',
                      currency: dataCreateTransaction.fromCurrency || ''
                    })
                  }
                  style={{
                    width: 'auto',
                    marginLeft: 'auto',
                    padding: '0.75rem'
                  }}
                />
              </div>
            </S.AdvancedOptionsContainer>
          </S.AdvancedOptions>
        )}
      </HeroBackground>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: { ...ctx.query } }
}
