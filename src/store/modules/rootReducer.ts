import { combineReducers } from 'redux'
import ReturnType from 'typescript';
import cart from './cart/reducer'

export const rootReducer = combineReducers({
  cart,
})

export type RootState = ReturnType<typeof rootReducer>;
