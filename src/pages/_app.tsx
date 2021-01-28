/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppProps } from 'next/app';
// import '../config/ReactotronConfig';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeContainer from '../contexts/theme/ThemeContainer';
import AppProvider from '../hooks';
import { persistor, store } from '../store';
import GlobalStyle from '../styles/global';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <CookiesProvider>
            <AppProvider>
              <Component {...pageProps} />
            </AppProvider>
          </CookiesProvider>
        </PersistGate>
      </Provider>
      <GlobalStyle />
    </ThemeContainer>
  );
};

export default MyApp;
