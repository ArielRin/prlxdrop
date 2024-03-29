import '../styles/globals.css'
import { AppProvider } from '../context/context'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
// pages/_app.js (if you have one)
