/* eslint-disable @typescript-eslint/interface-name-prefix */
export enum ActionTypes {
  addProductToCartRequest = 'ADD_PRODUCT_TO_CART_REQUEST',
  addProductToCartSuccess = 'ADD_PRODUCT_TO_CART_SUCCESS',
  addProductToCartFailure = 'ADD_PRODUCT_TO_CART_FAILURE',
  removeProductToCartRequest = 'REMOVE_PRODUCT_TO_CART_REQUEST',
  removeProductToCartSuccess = 'REMOVE_PRODUCT_TO_CART_SUCCESS',
  removeProductToCartFailure = 'REMOVE_PRODUCT_TO_CART_FAILURE',
  updateAmountProductToCartRequest = 'UPDATE_AMOUNT_PRODUCT_TO_CART_REQUEST',
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  group: string;
  obs: string;
  image: string;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICartState {
  items: ICartItem[];
  failedStockCheck: number[];
}

interface ImageProduct {
  asset: object | string;
  mine: object | string;
  path: object | string;
}
