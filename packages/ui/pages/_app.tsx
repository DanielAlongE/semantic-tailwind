import type { AppProps /*, AppContext */ } from 'next/app'
import '../css/style.css'

function MyApp ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
