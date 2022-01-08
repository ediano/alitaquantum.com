import { useState, useCallback } from 'react'
import { MdCopyAll } from 'react-icons/md'

import { QRCode } from 'components/QRCode'
import { Status, Keys } from 'components/Status'

import { TransactionStatus } from 'services/ChangeNowService'

import * as S from './styles'

type Props = Partial<TransactionStatus>

export const Waiting = (props: Props) => {
  const [copyAddress, setCopyAddress] = useState(false)
  const [copyExtraId, setCopyExtraId] = useState(false)

  const handlerCopyText = useCallback(
    (value: string, type: 'address' | 'extraId') => {
      navigator.clipboard.writeText(value)

      if (type === 'address') {
        setCopyAddress(true)
        setCopyExtraId(false)
        setTimeout(() => {
          setCopyAddress(false)
        }, 7500)
      }

      if (type === 'extraId') {
        setCopyExtraId(true)
        setCopyAddress(false)
        setTimeout(() => {
          setCopyExtraId(false)
        }, 7500)
      }
    },
    []
  )

  return (
    <>
      <S.Title>Por favor, envie os fundos que você gostaria de trocar</S.Title>

      <S.Block>
        <S.Info>Envie:</S.Info>
        <S.Info className="primary">
          {props.expectedAmountFrom} {props.fromCurrency?.toUpperCase()}
        </S.Info>

        <S.WrapperDataFrom>
          <S.ContentDataFrom>
            <S.Info>Para este endereço:</S.Info>
            <S.WrapperCopy
              onClick={() =>
                handlerCopyText(props.payinAddress as string, 'address')
              }
            >
              <S.Info className={copyAddress ? 'primary copy' : 'primary'}>
                {props.payinAddress}
              </S.Info>

              <MdCopyAll />
            </S.WrapperCopy>
          </S.ContentDataFrom>

          {props.payinAddress && <QRCode value={props.payinAddress} />}
        </S.WrapperDataFrom>

        {props.payinExtraId && (
          <S.WrapperDataFrom>
            <S.ContentDataFrom>
              <S.Info>Para este ID: ID/MENO/TAG</S.Info>
              <S.WrapperCopy
                onClick={() =>
                  handlerCopyText(props.payinExtraId as string, 'extraId')
                }
              >
                <S.Info className={copyExtraId ? 'primary copy' : 'primary'}>
                  {props.payinExtraId}
                </S.Info>

                <MdCopyAll />
              </S.WrapperCopy>
            </S.ContentDataFrom>

            <QRCode value={props.payinExtraId} />
          </S.WrapperDataFrom>
        )}

        {props.amountFrom && (
          <S.AmountReceived>
            <S.Info>Recebido:</S.Info>
            <S.Info className="primary">
              {props.amountFrom} {props.fromCurrency?.toUpperCase()}
            </S.Info>
            <S.Info>Em:</S.Info>
            <S.Info className="primary">{props.depositReceivedAt}</S.Info>
          </S.AmountReceived>
        )}
      </S.Block>

      <S.Block>
        <Status status={props.status as Keys} />
      </S.Block>

      <S.Block>
        <S.Title>Estimativa</S.Title>

        <div>
          <S.Info>Você recebe:</S.Info>
          <S.Info className="primary">
            {props.expectedAmountTo} {props.toCurrency?.toUpperCase()}
          </S.Info>

          <S.Info>Carteira do destinatário:</S.Info>
          <S.Info className="primary">{props.payoutAddress}</S.Info>

          {props.payoutExtraId && (
            <>
              <S.Info>ID/MENO/TAG:</S.Info>
              <S.Info className="primary">{props.payoutExtraId}</S.Info>
            </>
          )}
        </div>
      </S.Block>
    </>
  )
}
