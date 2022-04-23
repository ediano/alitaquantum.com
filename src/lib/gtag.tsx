export const GA_TRACKING_ID = 'G-HY30L2M771'

type Event = {
  action: string
  category: string
  label: string
  value: number
}

export const pageView = (url: URL): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url
  })
}

export const event = ({ action, category, label, value }: Event): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value
  })
}
