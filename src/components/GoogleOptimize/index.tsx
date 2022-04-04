import Script from 'next/script'

export const GoogleOptimize = () => {
  return (
    <Script
      strategy="lazyOnload"
      src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_GOOGLE_OPTIMIZE}`}
    />
  )
}
