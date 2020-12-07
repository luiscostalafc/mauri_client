import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';
import { RootState } from '../../store/modules/rootReducer';
import { Cart, Container } from './styles';

const mapStateToProps = (state: RootState) => ({
  cartAmount: state.cart.items.length,
});

function CartHeader({ cartAmount }: ReturnType<typeof mapStateToProps>) {
  return (

    <Container>

     <Cart href="/cart">
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
