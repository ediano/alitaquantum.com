import { useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import * as Api from 'services/ApiService'
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
  transactionSpeedForecast: speedForecast,
  setToggle
}: Props) => {
  const router = useRouter()
  const { fixedRate } = useExchange()
  const [checkbox, setCheckbox] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const explod = speedForecast?.split('-')
  const waitForecast = explod.length === 2 ? explod.join(' à ') : speedForecast

  const handlerCreateTransaction = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    let transactionId = ''

    async function handler() {
      try {
        setIsLoading(true)
        const { data: transaction } = await Api.setCreateExchangeTransaction({
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

        transactionId = transaction.id

        await Api.setForm({
          email: contactEmail || 'hubspot@alitaquantum.com',
          transactionId: transaction.id,
          fromAmount: String(transaction.fromAmount),
          fromCurrency: transaction.fromCurrency,
          toCurrency: transaction.toCurrency,
          fromAddress: transaction.payinAddress,
          fromExtraId: transaction.payinExtraId || '',
          toAddress: transaction.payoutAddress,
          toExtraId: transaction.payoutExtraId || '',
          toAmount: String(transaction.toAmount)
        })

        router.push({
          pathname: '/trocar/txs',
          query: { id: transaction.id }
        })
      } catch (err) {
        router.push({
          pathname: '/trocar/txs',
          query: { id: transactionId }
        })
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
            ≈ {explod.length === 2 ? waitForecast + ' minutos' : waitForecast}
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

      {isLoading && (
        <S.WrapperSpinner>
          <Spinner
            heightBase="100px"
            circle={{ width: '100px', height: '100px' }}
          />
        </S.WrapperSpinner>
      )}
    </S.Container>
  )
}
