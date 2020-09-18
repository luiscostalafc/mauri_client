import ThemeContainer from '../../src/contexts/theme/ThemeContainer'
import { Provider } from 'react-redux'
import AppProvider from '../hooks'
import {CookiesProvider} from 'react-cookie'
import { AppProps } from 'next/app'

import store from '../store'

import GlobalStyle from '../styles/global'


const MyApp = ({ Component, pageProps }: AppProps) => {
  return (

    <ThemeContainer>
      <Provider store={store}>
      <CookiesProvider>
       <AppProvider>
      <Component {...pageProps} />
       </AppProvider>
       </CookiesProvider>
       </Provider>
       < GlobalStyle />
    </ThemeContainer>

  )
}

export default MyApp
