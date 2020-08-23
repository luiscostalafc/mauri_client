import React from 'react'

import Slider from '../components/Slider'
import Header from '../components/Header'
import Group from '../components/Groups'
import LeftMenu from '../components/LeftMenu'
import RightMenu from '../components/RightMenu'

import { Grid, Heading, Flex } from '@chakra-ui/core'

export default function Index() {
  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns=" 0px 260px 740px 260px 0px"
      templateRows="100px 50px 860px 100px"
      templateAreas="
    '. . header .'
    '. menuL . menuR'
    '. slider products group'
    '. . . .'
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

      <Flex gridArea="products" flexDir="column" alignItems="flex-start">
        <Heading>Aqui são os produtos</Heading>
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
      </Flex>
    </Grid>
  )
}
