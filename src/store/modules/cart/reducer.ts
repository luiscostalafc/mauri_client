/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import produce from 'immer';
import { Reducer } from 'redux';
import { ActionTypes, ICartState } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer = (state = INITIAL_STATE, action) => {
  return produce((stateProducer, draftProducer) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draftProducer.items.findIndex(
          (item: { product: { id: any } }) => item.product.id === product.id,
        );
        if (productInCartIndex >= 0) {
          draftProducer.items[productInCartIndex].quantity++;
        } else {
          draftProducer.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }
      // case ActionTypes.addProductToCartFailure: {
      //   draftProducer.failedStockCheck.push(action.payload.productId)

      //   break
      // }

      case ActionTypes.removeProductToCartRequest: {
        const { productId } = action.payload;

        const productInCartIndex = draftProducer.items.findIndex(
          (item: { product: { id: any } }) => item.product.id === productId,
        );

        if (productInCartIndex >= 0) {
          draftProducer.items.splice(productInCartIndex, 1);
        }

        break;
      }

      case ActionTypes.updateAmountProductToCartRequest: {
        const { quantity, productId } = action.payload;

        if (quantity <= 0) {
          return stateProducer;
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
        return draftProducer;
      }
    }
  });
};

export default cart;
