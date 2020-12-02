import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import { IState } from '../..'
import {addProductToCartSuccess, addProductToCartRequest, addProductToCartFailure } from './actions'
import api from '../../../services/api'
import { AxiosResponse } from 'axios'
import { ActionTypes } from './types'
import { useToast } from '../../../hooks/toast'

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number
  quantity: number
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload

  const { addToast } = useToast()

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0
  })

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(api.get, `stock-operations/${product.id}`)

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product))
  } else {
    yield put (addProductToCartFailure(product.id))

    addToast({
      type: 'error',
      title: 'Quantidade do produto fora do estoque!',
      description: 'Favor escolher outro produto'
    })

  }

}

export default all([
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock)
])
