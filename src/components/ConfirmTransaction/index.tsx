import { useState, Dispatch, SetStateAction } from 'react'

import { Button } from 'components/Button'
import { AnchorButton } from 'components/AnchorButton'

import { DataCreateTransaction } from 'layouts/Exchange'

import * as S from './styles'

type Props = {
  setToggle: Dispatch<SetStateAction<boolean>>
} & DataCreateTransaction

export const ConfirmTransaction = ({
  fromCurrency,
  fromAmount,
  toCurrency,
  toAmount,
  address,
  transactionSpeedForecast,
  setToggle
}: Props) => {
  const [checkbox, setCheckbox] = useState(false)

  const explod = transactionSpeedForecast?.split('-')
  const waitForecast = explod?.length ? explod?.join(' à ') : explod

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
          <AnchorButton
            uppercase
            title="Confirmar"
            href="/exchange/txs"
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
            Eu li e concordo com os Termos de Uso, Política de Privacidade e
            Declaração de divulgação dos riscos
          </S.WrapperCheckbox>
        </S.Block>
      </S.Wrapper>
    </S.Container>
  )
}
