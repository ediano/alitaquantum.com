import Script from 'next/script'

export const GoogleAnalytics = () => {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-1QBWQLRK9B" />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QBWQLRK9B', {
              page_path: window.location.pathname,
            });
          `
        }}
      />
    </>
  )
}
