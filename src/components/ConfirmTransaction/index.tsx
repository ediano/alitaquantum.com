import { useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ChangeNow from 'services/ChangeNowService'
import { useExchange } from 'context/exchange'

import { Button } from 'components/Button'
import { DataCreateTransaction } from 'layouts/Exchange'
import { Spinner } from 'components/Spinner'

import * as S from './styles'

type Props = {
  setToggle: Dispatch<SetStateAction<boolean>>
} & DataCreateTransaction

export const ConfirmTransaction = ({
  fromCurrency,
  fromNetwork,
  fromAmount,
  toCurrency,
  toNetwork,
  toAmount,
  address,
  extraId,
  contactEmail,
  refundAddress,
  refundExtraId,
  transactionSpeedForecast,
  setToggle
}: Props) => {
  const router = useRouter()
  const { fixedRate } = useExchange()
  const [checkbox, setCheckbox] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const explod = transactionSpeedForecast?.split('-')
  const waitForecast = explod?.length ? explod?.join(' à ') : explod

  const handlerCreateTransaction = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    async function handler() {
      try {
        setIsLoading(true)
        const { data: transaction } =
          await ChangeNow.setCreateExchangeTransaction({
            address,
            extraId: extraId || '',
            fromAmount,
            fromCurrency,
            fromNetwork,
            toCurrency,
            toNetwork,
            contactEmail: contactEmail || '',
            refundAddress: refundAddress || '',
            refundExtraId: refundExtraId || '',
            flow: !fixedRate ? 'standard' : 'fixed-rate'
          })

        router.push({
          pathname: '/trocar/txs',
          query: { id: transaction.id }
        })
      } catch (err) {
        setIsLoading(false)
      }
    }
    if (
      fromCurrency &&
      toCurrency &&
      fromNetwork &&
      toNetwork &&
      fromAmount &&
      address
    ) {
      handler()
    }
  }

  if (isLoading) {
    return (
      <S.Container>
        <Spinner
          heightBase="25vh"
          circle={{ width: '250px', height: '250px' }}
        />
      </S.Container>
    )
  }

  return (
    <S.Container>
      <S.Title>Confirme os dados inseridos</S.Title>

      <S.Block>
        <S.Card>
          <S.CardTitle>Você envia</S.CardTitle>
          <S.CardAmount>
            {fromAmount} {fromCurrency?.toUpperCase()}
          </S.CardAmount>
        </S.Card>

        <S.Card>
          <S.CardTitle>Você recebe</S.CardTitle>
          <S.CardAmount>
            ≈ {toAmount} {toCurrency?.toUpperCase()}
          </S.CardAmount>
          <S.CardWallet>{address}</S.CardWallet>
        </S.Card>

        <S.Card>
          <S.CardTitle>Tempo estimado</S.CardTitle>
          <S.CardTime>
            ≈ {explod?.length ? waitForecast + ' minutos' : waitForecast}
          </S.CardTime>
        </S.Card>
      </S.Block>

      <S.WrapperButton>
        <Button
          uppercase
          title="Confirmar"
          onClick={handlerCreateTransaction}
          background={checkbox ? 'primary' : 'secondary'}
          disabled={!checkbox}
        />

        <Button uppercase title="Cancelar" onClick={() => setToggle(false)} />
      </S.WrapperButton>

      <S.Block>
        <S.WrapperCheckbox>
          <S.Checkbox type="checkbox" onClick={() => setCheckbox(!checkbox)} />
          Declaro ter lido o{' '}
          <Link href="/termos-de-uso" passHref>
            <S.Anchor
              target="_blank"
              style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}
            >
              Termos de uso
            </S.Anchor>
          </Link>{' '}
          e as{' '}
          <Link href="/politica-de-privacidade" passHref>
            <S.Anchor target="_blank" style={{ marginLeft: '0.5rem' }}>
              Política de privacidade
            </S.Anchor>
          </Link>
          .
        </S.WrapperCheckbox>
      </S.Block>
    </S.Container>
  )
}
