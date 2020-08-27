import React, { useState } from 'react'

import Slider from '../components/Slider'
import Header from '../components/Header'
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'
import ProductAuto from '../components/Product/ProductAuto'
import AutoExpandMenu from '../components/ExpandMenu/AutoExpandMenu'
import Footer from '../components/Footer'

import { Grid, Flex, Image } from '@chakra-ui/core'

export default function Index() {
  const [expand, setExpand] = useState(false)

  const handleClick = () => {
    setExpand(true)
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
        <Slider></Slider>
      </Flex>

      <Flex gridArea="filter" flexDirection="row" position="relative">
        <AutoExpandMenu />
      </Flex>

      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  )
}
