import { site } from 'config/site'

const getUrl = (uri: string) => new URL(uri, site.url).toString()

export { getUrl }
