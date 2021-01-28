/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ActionTypes } from './types';

export function addProductToCartRequest(product: any) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      product,
    },
  };
}

export function addProductToCartSuccess(product: any) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    },
  };
}

export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId,
    },
  };
}

export function removeProductToCartRequest(productId: number) {
  return {
    type: ActionTypes.removeProductToCartRequest,
    payload: {
      productId,
    },
  };
}

export function updateAmountProductToCartRequest(
  productId: number,
  quantity: number,
) {
  return {
    type: ActionTypes.updateAmountProductToCartRequest,
    payload: {
      productId,
      quantity,
    },
  };
}
