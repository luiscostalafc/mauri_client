import React, { useState } from 'react'

//import Slider from '../components/Slider'
import Header from '../components/Header'
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'
import ProductAuto from '../components/Product/ProductAuto'
//import AutoExpandMenu from '../components/ExpandMenu/AutoExpandMenu'
import Footer from '../components/Footer'
import {
  Input,
  Flex,
  Box,
  Select,
  Button,
  Image,
  Grid,
  ButtonGroup
} from '@chakra-ui/core'
import { AiFillCar } from 'react-icons/ai'
import { GrBike, GrBook } from 'react-icons/gr'
import { FaMotorcycle, FaSearch } from 'react-icons/fa'
import { GoTools } from 'react-icons/go'
import { GiScissors } from 'react-icons/gi'

export default function Index() {
  const [transform, setTransform] = useState('scaleX(0)')

  function handleClick() {
    if (transform === 'scaleX(0)') {
      setTransform('scaleX(1)')
    } else {
      setTransform('scaleX(0)')
    }
  }

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns=" 0px 260px 740px 260px 0px"
      templateRows="100px 50px 740px 100px 80px"
      templateAreas="
    '. logo header logoR'
    '. menuL filter menuR'
    '. slider products .'
    '. . . .'
    '. . footer .'
    "
      justifyContent="center"
      justifyItems="center"
    >
      <Flex
        gridArea="header"
        flexDir="row"
        alignItems="flex-start"
        width={{ sm: '68%', md: '100%' }}
      >
        <Header />
      </Flex>

      <Flex
        gridArea="products"
        flexDir="row"
        alignItems="flex-start"
        marginTop={20}
        wrap="wrap"
      >
        <ProductAuto />
      </Flex>
      <Flex
        marginTop={-8}
        gridArea="menuL"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <LeftMenu />
      </Flex>
      <Flex gridArea="logo" alignItems="flex-start" justify="center">
        <Image
          size="70%"
          src="https://i.imgur.com/y7zANKQ.jpg"
          alt="Liconnection"
        />
      </Flex>
      <Flex gridArea="logoR" alignItems="flex-start" justify="center">
        <Image
          size="70%"
          src="https://i.imgur.com/2o426TW.jpg"
          alt="Liconnection"
        />
      </Flex>
      <Flex
        marginTop={-8}
        gridArea="menuR"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <RightMenu />
      </Flex>

      <Flex
        marginTop={-12}
        gridArea="slider"
        flexDir="column"
        alignItems="flex-start"
      >
        <Box flex="1" textAlign="left">
          <ButtonGroup spacing={1}>
            <Button
              as="button"
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#ED8936"
              leftIcon={AiFillCar}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
              onClick={() => {
                handleClick()
              }}
            >
              Auto Peças
            </Button>
            <Button
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#48BB78"
              leftIcon={FaMotorcycle}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
              onClick={() => {
                handleClick()
              }}
            >
              Moto Peças
            </Button>
            <Button
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#E53E3E"
              leftIcon={GrBike}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
            >
              Bicicletas
            </Button>
            <Button
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#F6E05E"
              leftIcon={GoTools}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
            >
              Ferramentas
            </Button>
            <Button
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#4299E1"
              leftIcon={GrBook}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
            >
              Livraria
            </Button>
            <Button
              width="100%"
              height={12}
              marginTop={1}
              size="lg"
              bg="#B7791F"
              leftIcon={GiScissors}
              variant="solid"
              color="#2D3748"
              justifyContent="left"
            >
              Papelaria
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>

      <Flex
        id="items"
        gridArea="filter"
        flexDirection="row"
        position="relative"
      >
        <Box
          display="flex"
          marginLeft={180}
          flexDirection="row"
          transform={transform}
          transformOrigin="left"
          transition="1.0s"
        >
          <Select
            placeholder="Montad."
            display="flex"
            height="40px"
            width="120px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Select
            placeholder="Modelo"
            display="flex"
            height="40px"
            width="115px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Select
            placeholder="Ano-Fab"
            display="flex"
            height="40px"
            width="120px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Select
            placeholder="Ano-Mod"
            display="flex"
            height="40px"
            width="130px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Select
            placeholder="Motor"
            display="flex"
            height="40px"
            width="105px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Select
            placeholder="Combust."
            display="flex"
            height="40px"
            width="130px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>
          <Select
            placeholder="Chassi"
            display="flex"
            height="40px"
            width="110px"
            color="#b2b2b2"
            alignItems="center"
            justifyContent="center"
          ></Select>

          <Input maxW="120px" size="md" />
          <Button size="md" leftIcon={FaSearch} />
        </Box>
      </Flex>

      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  )
}
