/* eslint-disable @typescript-eslint/interface-name-prefix */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { ICartState } from './modules/cart/types';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducer from './persistReducer';

export interface IState {
  cart: ICartState;
}

// const sagaMonitor =
// process.env.NODE_ENV === 'development'
// ? console.tron.createSagaMonitor()
// : null;

const sagaMiddleware = createSagaMiddleware({});

const midddlewares = [sagaMiddleware];

const store = createStore(
  persistReducer(rootReducer),
  composeWithDevTools(applyMiddleware(...midddlewares)),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
