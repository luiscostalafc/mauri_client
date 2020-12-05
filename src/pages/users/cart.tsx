import React from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import { connect, DispatchProp } from 'react-redux';
import ReturnType from 'typescript';
import { Container, ProductTable, Total } from '../../styles/pages/cart';
import { RootState } from '../../store/modules/rootReducer';
import { updateAmountProductToCartRequest, removeProductToCartRequest } from '../../store/modules/cart/actions'
import { IProduct } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

const mapStateToProps = (state: RootState) => ({
  items: state.cart.items.map(product => ({
    ...product,
    subtotal: formatPrice(product.quantity * product.product.price),
  })),
  total: formatPrice(
    state.cart.items.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0)
  ),
});

type StateProps = ReturnType<typeof mapStateToProps>;

type Props = StateProps & DispatchProp;

function Cart(props: Props) {
  const { items, dispatch, total }= props;

  function incrementProduct(product: IProduct) {
    dispatch(
      updateAmountProductToCartRequest(product.id, product.quantity +1)
    );
  }

  function decrementProduct(product: IProduct) {
    dispatch(
      updateAmountProductToCartRequest(product.id, product.quantity -1)
    );
  }

  return (
    <Container>
      {items.map(item => (
        <ProductTable>
          <thead>
            <tr>
               <th/>
              <th>Produto</th>
              <th>QTDE</th>
              <th>Subtotal</th>
               <th/>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={item.product.image} alt={item.product.name}/>
              </td>
              <td>
      <strong>{item.product.name}</strong>
      <span>{item.product.priceFormatted}</span>
              </td>

              <td>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      decrementProduct(item.product)
                    }
                  >
                    <MdRemoveCircleOutline
                       size={20}
                       color="#7159c2"
                       />
                  </button>
                  <input
                       type="number"
                       readOnly
                       value={item.quantity}
                       />
                       <button
                         type="button"
                         onClick={() =>
                             incrementProduct(item.product)
                        }
                       >
                         <MdAddCircleOutline
                            size={20}
                            color="#7159c2"
                         />
                       </button>
                </div>
              </td>
              <td>
                      <strong>{item.subtotal}</strong>
              </td>
              <td>
                <button
                 type="button"
                 onClick={() =>
                   dispatch(
                     removeProductToCartRequest(item.product.id)
                   )
                }
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          </tbody>
        </ProductTable>
      ))}
      <footer>
        <button type="button">Finalizar pedido</button>
        <Total>
          <span>Total</span>
              <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

export default connect(mapStateToProps)(Cart)
