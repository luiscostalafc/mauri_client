import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Link,
  Image,
} from '@chakra-ui/core'
import React from 'react'
import { formatPrice } from '../../utils/formatPrice'
import {FaCartArrowDown, FaPlusSquare} from 'react-icons/fa'
//import ProductList from '../ProductList'
import { connect, DispatchProp } from 'react-redux'
import ReturnType from 'typescript'
import { IProduct } from '../../types'

import { RootState } from '../../store/modules/rootReducer'
import { addProductToCartRequest } from '../../store/modules/cart/actions'
import { ICartItem } from '../../store/modules/cart/types'

interface ImageProduct {
  asset: object | string
  mine: object | string
  path: object | string
}

interface ProductItemProps {
  id: number
  group?: string
  group_id?: number
  subgroup?: string
  name?: string
  automaker?: string //montadora
  model?: string //modelo
  year_start?: string //ano-fab
  year_end?: string // ano-mod
  engine?: string // motor
  type?: string //combust.
  complement?: string //chassi
  obs?: string //descrição
  price: number  //valor
  image?: ImageProduct[]
}

type quantityProduct = { [key: number]: any };
const quantityObject : quantityProduct = {}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart.items,
  quantity: state.cart.items.reduce((quantity, currentValue) => {
    quantity[currentValue.product.id] = currentValue.quantity
    return quantity
  }, quantityObject)
});

type StateProps = ReturnType<typeof mapStateToProps>

type Props = StateProps & DispatchProp;


export function ProductItem(props: ProductItemProps) {

  function handleAddProduct(product: IProduct) {
    const { price, id } = props

    addProductToCartRequest({
      ...product,
      id,
      price
    })
  }

  return (
    <Flex
      margin={1}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      maxWidth="30%"
    >

      <Box p="6">
        <Flex align="center" justify="center" marginBottom={5}>
        <Box>
         <Link href="#">
        <Image maxHeight="100px" maxWidth="200px"  src={!props.image ? '/home.png': 'não tem imagem'} alt="Imagem do produto" />
        </Link>
         </Box>

          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="orange">
              {props.group}
            </Badge>
          </Box>
        </Flex>

        <Box
          marginTop={2}
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          <Link color="blue.500" href="#">
            {props.name}
          </Link>
        </Box>

        <Box marginTop={2}>
          <AccordionItem>
            <AccordionHeader _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="left">
                Descrição
             </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>{props.obs}</AccordionPanel>
          </AccordionItem>
        </Box>

        {/* <Box marginTop={2}>
          <AccordionItem>
            <AccordionHeader _expanded={{ bg: 'tomato', color: 'white' }}>
              <Box flex="1" textAlign="left">
                Filtro Avançado
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel>
              <Filter />
            </AccordionPanel>
          </AccordionItem>
        </Box> */}

        <Box marginTop={5}>
           {/* <Button
           leftIcon={<FaPlusSquare/>}
           variant="solid"
           colorScheme="#F6AD55"
           onClick={() => handleAddProduct()}
          >
          <div>
            {props.quantity[props.id] || 0}
          </div>
          Adicionar ao Carrinho
          </Button> */}

        </Box>
      <Box marginTop={3}>{formatPrice(props.price)}</Box>
        <Box marginTop={5}>
          <Button
            size="md"
            leftIcon={FaCartArrowDown}
            variantColor="green"
            variant="solid"
          >
            Comprar
    </Button>
        </Box>
      </Box>



    </Flex>

  )
}

export default connect(mapStateToProps)(ProductItem)


