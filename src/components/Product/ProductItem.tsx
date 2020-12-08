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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Image,
} from '@chakra-ui/core'
import React from 'react'
import { FaCartArrowDown } from 'react-icons/fa'
import { formatPrice } from '../../utils/formatPrice'



interface ImageProduct {
  asset: object | string
  mine: object | string
  path: object | string
}

interface ProductItemProps {
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
  price: number //valor
  image?: ImageProduct[]
}


export default function ProductItem(props: ProductItemProps) {



  return (
    <Flex
      marginLeft={3}
      marginRight={3}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >

      <Box p="6">
        <Flex align="center" justify="center" marginBottom={5}>
        <Box>
         <Link href="#">
        <Image maxHeight="100px" maxWidth="200px"  src={!props.image ? '/home.png': 'não tem imagem'} alt="teste" />
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
          <NumberInput size="sm" maxW="60px" min={0}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
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


