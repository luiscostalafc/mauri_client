import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import AppProvider from '../hooks'
import {CookiesProvider} from 'react-cookie'
import { AppProps } from 'next/app'

import GlobalStyle from '../styles/global'


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (

    <ThemeContainer>
      <CookiesProvider>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
       </CookiesProvider>
       < GlobalStyle />
    </ThemeContainer>

  )
}

export default MyApp
