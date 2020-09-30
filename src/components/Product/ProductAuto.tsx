import React, {useState, useEffect} from 'react'
import {
  Box,
  Flex,
  Image,
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

import { get } from '../../services/api'

import Filter from '../Filter'

interface ProductAuto {
  imageUrl: string
  imageAlt: string
  segment: string
  title: string
  description: string
  motor: string
  position: string
  system: string
  material: string
  color: string
  measure: number
  unity: string
  quantity: number
  formattedPrice: number
}

import { FaCartArrowDown } from 'react-icons/fa'

const ProductAuto = (props: ProductAuto) => {

  useEffect(() => {
   async function loadProductAuto() {
     const response = await get('products')
      console.log(response.data)

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
        <Image src={props.imageUrl} alt={props.imageAlt} />
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
