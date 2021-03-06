/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          item => item.product.id === product.id,
        );
        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      // case ActionTypes.addProductToCartFailure: {
      //   draft.failedStockCheck.push(action.payload.productId)

      //   break
      // }

      case ActionTypes.removeProductToCartRequest: {
        const { productId } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          item => item.product.id === productId,
        );

        if (productInCartIndex >= 0) {
          draft.items.splice(productInCartIndex, 1);
        }

        break;
      }

      case ActionTypes.updateAmountProductToCartRequest: {
        const { quantity, productId } = action.payload;

        if (quantity <= 0) {
          return state;
        }

        return produce<ICartState>(state, draft => {
          const productInCartIndex = draft.items.findIndex(
            item => item.product.id === productId,
          );

          if (productInCartIndex >= 0) {
            const product = draft.items[productInCartIndex];
            product.quantity = Number(quantity);
          }
        });
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
