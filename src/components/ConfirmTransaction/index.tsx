import { useState, Dispatch, SetStateAction, MouseEvent } from 'react'
import { useRouter } from 'next/router'

import ChangeNow from 'services/ChangeNowService'

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
  const [checkbox, setCheckbox] = useState(false)

  const explod = transactionSpeedForecast?.split('-')
  const waitForecast = explod?.length ? explod?.join(' à ') : explod

  const handlerCreateTransaction = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    async function handler() {
      try {
        const response = await ChangeNow.setCreateExchangeTransaction({
          address,
          extraId: extraId || '',
          fromAmount,
          fromCurrency,
          fromNetwork,
          toCurrency,
          toNetwork,
          contactEmail: contactEmail || '',
          refundAddress: refundAddress || '',
          refundExtraId: refundExtraId || ''
        })

        router.push({
          pathname: '/exchange/[txs]',
          query: { txs: 'txs', id: response.data.id }
        })
      } catch (err) {}
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
      <S.Wrapper>
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
            <S.Checkbox
              type="checkbox"
              onClick={() => setCheckbox(!checkbox)}
            />
            Confirmo que as informações estão corretas!
          </S.WrapperCheckbox>
        </S.Block>
      </S.Wrapper>
    </S.Container>
  )
}
