import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './modules/rootReducer'
import rootSaga from './modules/rootSaga'
import persistReducer from './persistReducer'

import { ICartState } from './modules/cart/types'
import { persistStore } from 'redux-persist'

export interface IState {
  cart: ICartState
}

const sagaMonitor =
process.env.NODE_ENV === 'development'
? console.tron.createSagaMonitor()
: null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const midddlewares = [sagaMiddleware]


const store = createStore(
  persistReducer(rootReducer),
  composeWithDevTools(
    applyMiddleware(...midddlewares)
  )
  )

const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

export { store, persistor}
