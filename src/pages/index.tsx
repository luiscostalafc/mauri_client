import React, { useState } from 'react'

import Slider from '../../src/components/Slider'
import Group from '../../src/components/Group'
import Header from '../../src/components/Header'
import LeftMenu from '../../src/components/LeftMenu'
import RightMenu from '../../src/components/RightMenu'
//import ProductAuto from '../../src/components/Product/ProductAuto'
import AutoExpandMenu from '../../src/components/ExpandMenu/AutoExpandMenu'
import Footer from '../../src/components/Footer'
import { Flex, Image, Grid } from '@chakra-ui/core'

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
      templateRows="100px 50px auto 0px 80px"
      templateAreas="
    '. logo header logoR'
    '. menuL filter menuR'
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
        width={{ sm: '68%', md: '100%' }}
      >
        <Header />
      </Flex>

      <Flex
        gridArea="products"
        flexDir="row"
        alignItems="flex-center"
        maxWidth="100vh"
        wrap="wrap"
      >
        {/* <ProductAuto></ProductAuto> */}
      </Flex>
      <Flex
        maxHeight="100vh"
        gridArea="group"
        flexDir="row"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Group />
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
        <Slider onClick={handleClick} />
      </Flex>

      <Flex
        id="items"
        gridArea="filter"
        flexDirection="row"
        position="relative"
      >
        <AutoExpandMenu transform={transform} />
      </Flex>

      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  )
}
