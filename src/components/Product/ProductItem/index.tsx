import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,

  Image, Link
} from '@chakra-ui/core';
import React, { useCallback } from 'react';
import { FaCartArrowDown } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addProductToCartRequest } from '../../../store/modules/cart/actions';
import { IProduct } from '../../../types';
import { formatPrice } from '../../../utils/formatPrice';
import Filter from '../../Filter';


interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  quantity?: number;
  group: string;
  obs: string;
  image: string;
  product: IProduct;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  name,
  price,
  quantity,
  group,
  obs,
  image,
  product,
}) => {
  const dispatch = useDispatch();

  //   const hasFailedStockCheck = useSelector<IState, boolean>(state => {
  //    return state.cart.failedStockCheck.includes(id)
  //  })

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

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
              <Image
                maxHeight="100px"
                maxWidth="200px"
                src={image || '/home.png'}
                alt="Imagem do produto"
              />
            </Link>
          </Box>

          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="orange">
              {group}
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
            {name}
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
            <AccordionPanel>{obs}</AccordionPanel>
          </AccordionItem>
        </Box>

        <Box marginTop={2}>
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
        </Box>

        <Box marginTop={3}>{formatPrice(price)}</Box>
        <Box marginTop={5} alignItems="center" justifyContent="center">
          <Button
            type="button"
            marginLeft={-3}
            onClick={handleAddProductToCart}
            size="sm"
            leftIcon={FaCartArrowDown}
            variantColor="green"
            variant="solid"
          >
            {/* <Box marginLeft={-1} marginRight={2}>{ hasFailedStockCheck && <span style={{ color: 'red'}}>Falta de estoque</span>}</Box> */}
            Adicionar ao Carrinho
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductItem;
