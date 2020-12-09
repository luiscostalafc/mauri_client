import React from 'react';

import { MdShoppingBasket } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Container, Cart} from './styles';
import { IState } from  '../../store'
import { ICartItem } from '../../store/modules/cart/types'



// const mapStateToProps = (state: RootState) => ({
//   cartAmount: state.cart.items.length,
// });

 const  CartHeader: React.FC = () => {
  const cartAmount = useSelector<IState, ICartItem[]>(state => Array(state.cart.items.length))

  return (

    <Container>

     <Cart href="/users/cart">
       <a>
      <div>
        <strong>Meu carrinho</strong>
        <span> {cartAmount} itens</span>
      </div>
       <MdShoppingBasket size={36} color="#ff9000" />
       </a>

     </Cart>
    </Container>

  )
}

export default CartHeader;
