import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import AppProvider from '../hooks'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeContainer>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
    </ThemeContainer>
  )
}

export default MyApp
