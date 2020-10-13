import React, { useState, useEffect } from 'react'


import {
  Box,
  Flex,
  Badge,
  Button,
  Link,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  AccordionHeader,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Image,
  List,
  ListItem
} from '@chakra-ui/core'



import { get } from '../../services/api'

import Filter from '../Filter'



interface ImageProduct {
  asset?: string
  mine?: string
  path?: string
}

interface ProductAuto {
  id?: number
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
  formattedPrice?: number //valor
  image?: ImageProduct[]
}

import { FaCartArrowDown } from 'react-icons/fa'

const ProductAuto: React.FC = () => {
  const [products, setProducts] = useState<ProductAuto[]>([])


  useEffect(() => {
    async function loadProductAuto() {
      const response = await get('products')
      setProducts(response)

      console.log(products)

    }
    loadProductAuto()

  }, [])




  return (
    <Flex
      marginLeft={3}
      marginRight={3}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      {/* <Link href="#">
        <Image src="/home.png" alt="teste" />
      </Link> */}




      {products.map(product => (

        <List>
          <ListItem key={product.id}>
            <Box p="6">
              <Flex align="center" justify="center" marginBottom={5}>
                <Box d="flex" alignItems="baseline">
                  <Badge rounded="full" px="2" variantColor="orange">
                    {product.group_id}
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
                  {product.name}
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
                  <AccordionPanel>{product.obs}</AccordionPanel>
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

              <Box marginTop={5}>
                <NumberInput size="sm" maxW="60px" min={0}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
              <Box marginTop={3}>R$99,00</Box>
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
          </ListItem>

        </List>

      ))}



    </Flex>

  )
}

export default ProductAuto
