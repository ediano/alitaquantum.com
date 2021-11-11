import Script from 'next/script'

export const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={'https://www.googletagmanager.com/gtag/js?id=UA-171838425-1'}
      />
      <Script
        id="google-string-gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-171838425-1', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  )
}
