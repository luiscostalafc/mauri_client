import React from 'react';

import { MdShoppingBasket } from 'react-icons/md'
import { connect } from 'react-redux';
import ReturnType from 'typescript';
import { Container, Cart} from './styles';
import { RootState } from '../../store/modules/rootReducer'


const mapStateToProps = (state: RootState) => ({
  cartAmount: state.cart.items.length,
});

function CartHeader({ cartAmount }: ReturnType<typeof mapStateToProps>) {
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

export default connect(mapStateToProps)(CartHeader);
