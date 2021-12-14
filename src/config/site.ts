const isDev = process.env.NODE_ENV === 'development'
const PORT = process.env.PORT || '3000'

export const site = {
  name: 'Alita Quantum',
  title: 'Sua plataforma de troca de criptomoedas',
  description: 'Troque criptomoedas de forma simples, fácil e sem limites.',
  keywords:
    'trocar, exchange, trocar instantaneamente, transferir, transferir instantaneamente, exchange instantaneamente, criptomoedas, plataforma de criptomoedas, taxa zero, troca sem custódia, troca privada, troca segura, transferir criptomoedas, btc, eth, trx, bnb',
  url: isDev ? `http://localhost:${PORT}` : 'https://www.alitaquantum.com',
  favicon: '/img/favicon.png',
  logo: '/img/logo.png'
}
