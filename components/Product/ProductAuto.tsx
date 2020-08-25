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

interface ProductAuto {
  imageUrl: string
  imageAlt: string
  segment: string
  title: string
  description: string
  formattedPrice: number
}

import { FaCartArrowDown } from 'react-icons/fa'

const ProductAuto = (props: ProductAuto) => {
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
