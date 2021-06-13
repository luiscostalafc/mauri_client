/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import {
  MdAddCircleOutline,
  MdDelete,
  // eslint-disable-next-line prettier/prettier
  MdRemoveCircleOutline,
} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import {
  removeProductToCartRequest,
  // eslint-disable-next-line prettier/prettier
  updateAmountProductToCartRequest,
} from '../../store/modules/cart/actions';
import { ICartItem } from '../../store/modules/cart/types';
import { Container, ProductTable, Total } from '../../styles/pages/cart';
import { IProduct } from '../../types';
import { formatPrice } from '../../utils/formatPrice';

interface CartProductProps {
  product: IProduct;
}

const Cart: React.FC<CartProductProps> = ({ product }) => {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  const total = cart?.reduce((t, items) => {
    return t + items?.product?.price * items?.product?.quantity;
  }, 0);

  const dispatch = useDispatch();

  const incrementProduct = useCallback(() => {
    dispatch(
      updateAmountProductToCartRequest(
        product.id,
        Number(product.quantity + 1),
      ),
    );
  }, [dispatch, product]);

  const decrementProduct = useCallback(() => {
    dispatch(
      updateAmountProductToCartRequest(
        product.id,
        Number(product.quantity - 1),
      ),
    );
  }, [dispatch, product]);

  return (
    <Container>
      {cart?.map((item, index) => (
        <ProductTable key={index}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>QTDE</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src={item.product.image} alt={item.product.name} />
              </td>
              <td>
                <strong>{item.product.name}</strong>
                <span>{formatPrice(item.product.price)}</span>
              </td>

              <td>
                <div>
                  <button type="button" onClick={() => decrementProduct()}>
                    <MdRemoveCircleOutline size={20} color="#ff9000" />
                  </button>
                  <input type="number" readOnly value={item.quantity} />
                  <button type="button" onClick={() => incrementProduct()}>
                    <MdAddCircleOutline size={20} color="#ff9000" />
                  </button>
                </div>
              </td>
              <td>
                <strong>
                  {(item.product.price * item.quantity).toFixed(2)}
                </strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(removeProductToCartRequest(item.product.id))
                  }
                >
                  <MdDelete size={20} color="#ff9000" />
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
          <strong>{formatPrice(total)}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
