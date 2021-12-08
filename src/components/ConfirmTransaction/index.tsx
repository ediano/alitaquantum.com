import { useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { stringify } from 'query-string'

import ChangeNow from 'services/ChangeNowService'
import { Mail } from 'services/MailService'
import { useExchange } from 'context/exchange'

import { Button } from 'components/Button'
import { DataCreateTransaction } from 'layouts/Exchange'

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

  const explod = transactionSpeedForecast?.split('-')
  const waitForecast = explod?.length ? explod?.join(' à ') : explod

  const handlerCreateTransaction = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    let id = ''

    async function handler() {
      try {
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

        id = transaction.id

        await Mail.post(
          '/submit',
          stringify({
            subject: `Exchange Created - ${fromCurrency} vs. ${toCurrency}`,
            $id: transaction.id,
            $address: address,
            $extraId: extraId || '',
            $fromAmount: fromAmount,
            $fromCurrency: fromCurrency,
            $fromNetwork: fromNetwork,
            $toCurrency: toCurrency,
            $toNetwork: toNetwork,
            $contactEmail: contactEmail || '',
            $refundAddress: refundAddress || '',
            $refundExtraId: refundExtraId || '',
            $flow: !fixedRate ? 'standard' : 'fixed-rate',
            accessKey: '3f6820b8-7e96-4d51-a2cf-6e5b6661688',
            honeypot: ''
          })
        )

        router.push({
          pathname: '/trocar/txs',
          query: { id: transaction.id }
        })
      } catch (err) {
        if (id) {
          router.push({
            pathname: '/trocar/txs',
            query: { id }
          })
        }
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
