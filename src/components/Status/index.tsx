import { useState, useEffect } from 'react'

import * as S from './styles'

const keys = {
  new: ['Nova transação'],
  waiting: ['Aguardando depósito', 'Depositado'],
  confirming: ['Confirmando', 'Confirmado'],
  exchanging: ['Trocando', 'Trocado'],
  sending: ['Enviado', 'Enviado'],
  finished: ['Transação finalizada'],
  failed: ['Transação falhou'],
  refunded: ['Devolveu os fundos'],
  verifying: ['Verificando']
}

const errors = ['failed', 'refunded']
export const start = ['waiting', 'confirming', 'exchanging', 'sending']
const finished = ['finished']

export type Keys = keyof typeof keys

type Steps = {
  step: string
  verified: boolean
}

type Props = {
  status: keyof typeof keys
}

export const Status = ({ status }: Props) => {
  const [steps, setSteps] = useState<Steps[]>([])

  useEffect(() => {
    let flow: boolean

    setSteps(
      start.map((step) => {
        const data = {
          step,
          verified: flow === undefined
        }

        if (step === status) flow = true

        return data
      })
    )
  }, [status])

  return (
    <S.Container>
      {errors.includes(status) && <div>error</div>}

      {start.includes(status) && (
        <S.WrapperCircle>
          {steps.map(({ step, verified }) => {
            const [name, subName] = keys[step as Keys]

            return (
              <S.WrapperStatus key={step}>
                <strong>{verified && step !== status ? subName : name}</strong>

                <S.Circle
                  data-loading={step === status}
                  data-verifying={verified}
                ></S.Circle>
              </S.WrapperStatus>
            )
          })}
        </S.WrapperCircle>
      )}

      {finished.includes(status) && <div>finished</div>}
    </S.Container>
  )
}
