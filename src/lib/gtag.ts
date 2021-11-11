export const pageview = (url: string) => {
  window.gtag &&
    window.gtag('config', 'UA-171838425-1', {
      page_path: url
    })
}
