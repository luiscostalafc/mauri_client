import React, {useState, useEffect} from 'react'
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
  AccordionPanel
} from '@chakra-ui/core'

import ProductImage from '../ProductImage'

import { get } from '../../services/api'

import Filter from '../Filter'

interface ImageProduct {
  asset?: string
  mine?: string
  path?: string
}

interface ProductAuto {
  group_id?: number
  subgroup_id?: number
  name?: string
  automaker?: string //montadora
  model?: string //modelo
  year_start?: string //ano-fab
  year_end?: string // ano-mod
  engine?: string // motor
  type?: string //combust.
  complement?: string //chassi
  obs?: string //descrição
  position?: string //posição
  system?: string //sistema
  material?: number //material
  color?: string //cor
  size?: string  //medida
  quality?: string // qualidade
  formattedPrice?: number //qualidade
  image?: ImageProduct[]
}

import { FaCartArrowDown } from 'react-icons/fa'

const ProductAuto = (props: ProductAuto) => {

  useEffect(() => {
   async function loadProductAuto() {
     const response = await get('products')
      console.log(response)
   }
   loadProductAuto()
  },[])



  return (
    <Box
      maxH={800}
      maxW={205}
      marginLeft={3}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Link href="#">
        <ProductImage />
      </Link>

      <Box p="6">
        <Flex align="center" justify="center" marginBottom={5}>
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="orange">
              {props.segment}
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
            {props.title}
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
            <AccordionPanel>{props.description}</AccordionPanel>
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
        <Box marginTop={3}>{props.formattedPrice}</Box>
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
    </Box>
  )
}

export default ProductAuto
