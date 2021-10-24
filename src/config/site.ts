const isDev = process.env.NODE_ENV === 'development'
const PORT = !process.env.PORT ? '300' : (process.env.PORT as string)

export const site = {
  name: 'Alita Quantum',
  title: 'Plataforma de troca de criptomoedas',
  description:
    'Troque criptomoedas de forma simples, fácil e sem limites a qualquer momento.',
  url: isDev ? `http://localhost:${PORT}` : 'https://alitaquantum.com',
  favicon: '/img/favicon.png',
  logo: '/img/logo_reverse.png'
}
