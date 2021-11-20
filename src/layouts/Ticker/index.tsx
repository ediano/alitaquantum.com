import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsArrowLeftRight } from 'react-icons/bs'

import { useExchange } from 'context/exchange'

import { Props } from 'pages/[ticker]'

import { InstantExchange } from 'components/InstantExchange'
import { AnchorButton } from 'components/AnchorButton'
import { Shared } from 'components/Shared'

import * as S from './styles'

export const TickerLayout = ({ data, suggestedCoins }: Props) => {
  const { query } = useRouter()
  const { tickers } = query as { tickers: string }
  const { estimatedAmount, dataFlow } = useExchange()
  const { fromAmount, fromName, toName } = dataFlow

  return (
    <S.WrapperBackground>
      <S.Background />

      <S.Main>
        <S.Container>
          <S.Block>
            <S.Title>
              Troque {data.fromName} para {data.toName} instantaneamente.
            </S.Title>

            <S.Description>
              Rápido, seguro e totalmente privado, com o melhor preço disponível
              somente aqui na Alita Quantum.
            </S.Description>
          </S.Block>

          <S.WrapperExchange>
            <InstantExchange />

            <AnchorButton
              uppercase
              disabled={estimatedAmount === '0'}
              title="Proximo"
              href={{
                pathname: '/trocar',
                query: { fromAmount, fromName, toName }
              }}
              style={{ marginTop: '25px', width: '250px' }}
            />

            <Link href="/trocar" passHref>
              <S.MoreCurrencyOptions>
                Mais opções de moedas!
              </S.MoreCurrencyOptions>
            </Link>
          </S.WrapperExchange>

          <S.Block>
            <S.TitleIcon>
              Como trocar de {data.fromName} para {data.toName}?
              <S.IconCloseFullscreen />
            </S.TitleIcon>
            <p>
              Aqui na Alita Quantum as trocas são realizadas de forma simples e
              orientada, imagine que você queira trocar {data.fromName} por{' '}
              {data.toName}.
            </p>

            <S.List>
              <li>
                <span>
                  Selecione o par {data.fromName} vs. {data.toName}.
                </span>
              </li>
              <li>
                <span>
                  Escolha o montante em {data.fromName} que deseja trocar.
                </span>
                <span>
                  Note que não existe limite máximo de transferência, entretanto
                  existe limite mínimo.
                </span>
              </li>
              <li>
                <span>
                  Realize o depósito para carteira indicada, aguardar a troca
                  ser concluída.
                </span>
              </li>
            </S.List>
          </S.Block>

          <S.WrapperShared>
            <Shared
              path={`/${tickers}`}
              message="Conte aos seus amigos os pares de moedas que você quer trocar!"
            />
          </S.WrapperShared>

          <S.BlockFooter>
            <S.TitleIcon>Mais opções de troca de {data.fromName}</S.TitleIcon>

            <S.FooterDescription>
              {data.fromName} tem mais opções de pares disponíveis.
              <br />
              Essa é apenas a ponta do iceberg, troque com mais de 5 mil pares
              disponíveis.{' '}
              <Link href="/trocar" passHref>
                <S.MoreCurrencyOptions>
                  Veja todas as opções de troca!
                </S.MoreCurrencyOptions>
              </Link>
            </S.FooterDescription>

            <S.FooterContent>
              {suggestedCoins.map((coin) => (
                <Link
                  key={coin.image}
                  href={`trocar-${data.fromCurrency}-para-${coin.ticker}`}
                  passHref
                >
                  <S.CardSuggestedCoins
                    title={`${data.fromName} vs. ${coin.name}`}
                  >
                    <S.WrapperCoins>
                      <S.ImageCoin
                        style={{
                          backgroundImage: `url("${data.fromImage}")`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      ></S.ImageCoin>
                      <span>{data.fromCurrency.toUpperCase()}</span>
                    </S.WrapperCoins>

                    <BsArrowLeftRight />

                    <S.WrapperCoins>
                      <S.ImageCoin
                        style={{
                          backgroundImage: `url("${coin.image}")`,
                          backgroundRepeat: 'no-repeat'
                        }}
                      ></S.ImageCoin>
                      <span>{coin.ticker.toUpperCase()}</span>
                    </S.WrapperCoins>
                  </S.CardSuggestedCoins>
                </Link>
              ))}
            </S.FooterContent>
          </S.BlockFooter>
        </S.Container>
      </S.Main>
    </S.WrapperBackground>
  )
}
