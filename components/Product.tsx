import React from 'react'
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

import { FaCartArrowDown } from 'react-icons/fa'

const Product = () => {
  const property = {
    imageUrl: 'https://i.imgur.com/OWbHGXO.jpg',
    imageAlt: 'Exemplo de produto',
    title: 'Motor X',
    formattedPrice: 'R$5.000',
    reviewCount: 34,
    rating: 4
  }

  return (
    <Box
      maxH={800}
      maxW={220}
      marginLeft={3}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Link href="#">
        <Image src={property.imageUrl} alt={property.imageAlt} />
      </Link>

      <Box p="6">
        <Flex align="center" justify="center" marginBottom={5}>
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="orange">
              Auto Peças
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
            {property.title}
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
            <AccordionPanel>
              Esse produto é muito bom e tem muita qualidade. Tudo isso com o
              melhor valor do mercado e etc..
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
        <Box marginTop={3}>{property.formattedPrice}</Box>
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

export default Product
