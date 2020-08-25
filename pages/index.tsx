import React from 'react'

import Slider from '../components/Slider'
import Filter from '../components/Filter'
import Header from '../components/Header'
import Group from '../components/Group'
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'
import Product from '../components/Product/ProductAuto'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

import { Grid, Flex, Box, Heading } from '@chakra-ui/core'

export default function Index() {
  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns=" 0px 260px 740px 260px 0px"
      templateRows="100px 50px 740px 100px 100px"
      templateAreas="
    '. . header .'
    '. menuL search menuR'
    '. slider products group'
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
        width={{ sm: '68%', md: 1260 }}
      >
        <Header />
      </Flex>
      <Flex gridArea="search" flexDir="row" alignItems="flex-start">
        <ProductList />
      </Flex>

      <Flex
        gridArea="products"
        flexDir="row"
        alignItems="flex-start"
        marginTop={20}
        wrap="wrap"
      >
        <Product />
      </Flex>
      <Flex
        gridArea="menuL"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <LeftMenu />
      </Flex>
      <Flex
        gridArea="menuR"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <RightMenu />
      </Flex>
      <Flex gridArea="slider" flexDir="column" alignItems="flex-start">
        <Slider />
      </Flex>
      <Flex gridArea="group" flexDir="column" alignItems="flex-start">
        <Group />
        <Box marginTop={5}>
          <Heading size="md">Filtro Avançado</Heading>
          <Filter />
        </Box>
      </Flex>
      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  )
}
