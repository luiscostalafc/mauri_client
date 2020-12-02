import { Flex, Grid, Image } from '@chakra-ui/core'
import React, { useState } from 'react'
import AutoExpandMenu from '../../src/components/ExpandMenu/AutoExpandMenu'
import Footer from '../../src/components/Footer'
import Group from '../../src/components/Group'
import Header from '../../src/components/Header'
import LeftMenu from '../../src/components/LeftMenu'
import ProductContent from '../../src/components/Product/ProductContent'
import RightMenu from '../../src/components/RightMenu'
import Slider from '../../src/components/Slider'


export default function Index() {
  // const [transform, setTransform] = useState('scaleX(0)')
  const [group, setGroup] = useState(1)


  function handleClick(e: number) {
    setGroup(e)
    // if (transform === 'scaleX(0)') {
    //   setTransform('scaleX(1)')
    // } else {
    //   setTransform('scaleX(0)')
    // }
  }

  return (
    <Grid
      as="main"
      height="100vh"
      width="100vh"
      templateColumns="100% 50% 100% 50%"
      templateRows="200px 50px auto 0px 80px"
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
        paddingTop={10} // seccond line of filter
        alignItems="flex-center"
        maxWidth="100vh"
        wrap="wrap"
      >
         <ProductContent/>
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
          src="/liconnection.svg"
          alt="Liconnection"
        />
      </Flex>
      <Flex gridArea="logoR" alignItems="flex-start" justify="center">
        <Image
          size="70%"
          src="/liconnection.svg"
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
        paddingTop={2}
        paddingLeft={2}
        marginTop={-12}
        gridArea="slider"
        flexDir="column"
        alignItems="flex-start"
      >
        <Slider onClick={(e: { target: { value: number } }) => handleClick(e.target.value)} />
      </Flex>

      <Flex
        paddingTop={2}
        id="items"
        gridArea="filter"
        flexDirection="row"
        position="relative"
      >
        <AutoExpandMenu group={group}/*transform={transform}*/ />
      </Flex>

      <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        <Footer />
      </Flex>
    </Grid>
  )
}
