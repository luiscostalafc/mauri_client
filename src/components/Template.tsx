import React, { useState } from 'react'

//import Slider from '../../src/components/Slider'
//import Group from '../../src/components/Group'
import Header from '../../src/components/Header'
import AdminLeftMenu from '../../src/components/AdminLeftMenu'
import AdminRightMenu from '../../src/components/AdminRightMenu'
//import ProductAuto from '../../src/components/Product/ProductAuto'
//import AutoExpandMenu from '../../src/components/ExpandMenu/AutoExpandMenu'
//import Footer from '../../src/components/Footer'
import { Flex, Image, Grid } from '@chakra-ui/core'

declare interface TemplateInterface {
  logo?: JSX.Element
  header?: JSX.Element
  logoR?: JSX.Element
  menuL?: JSX.Element
  filter?: JSX.Element
  menuR?: JSX.Element
  slider?: JSX.Element
  content?: JSX.Element
  group?: JSX.Element
  footer?: JSX.Element
}
export default function Template(props: TemplateInterface) {
  const [transform, setTransform] = useState('scaleX(0)')

  function handleClick() {
    const click = transform === 'scaleX(0)' ? 'scaleX(1)' : 'scaleX(0)'
    setTransform(click)
  }

  return (
    <Grid
      as="main"
      height="100vh"
      width="100vh"
      templateColumns="100% 50% 100% 50%"
      templateRows="200px 50px auto 0px"
      templateAreas="
    '. logoL header logoR'
    '. menuL . menuR'
    '.  content content content'
    '. . . .'
    "
      justifyContent="center"
      justifyItems="center"
    >
      <Flex gridArea="logoL" alignItems="flex-start" justify="center">
        { props.logo || <Image size="70%" src="/liconnection.svg" alt="Liconnection" /> }
      </Flex>

      <Flex gridArea="header" flexDir="row" alignItems="flex-start" width={{ sm: '68%', md: '100%' }}>
        { props.header || <Header />}
      </Flex>

      <Flex gridArea="logoR" alignItems="flex-start" justify="center">
        { props.logoR || <Image size="70%" src="/liconnection.svg" alt="Liconnection"/>}
      </Flex>

      <Flex marginTop={-8} gridArea="menuL" flexDir="row" alignItems="flex-start" justifyContent="flex-start">
        { props.menuL || <AdminLeftMenu onClick={handleClick} />}
      </Flex>

      {/* <Flex paddingTop={2} id="items" gridArea="filter" flexDirection="row" position="relative" >
        { props.filter || <AutoExpandMenu transform={transform} />}
      </Flex> */}

      <Flex marginTop={-8} gridArea="menuR" flexDir="row" alignItems="flex-start" justifyContent="flex-start" >
        { props.menuR || <AdminRightMenu onClick={handleClick} />}
      </Flex>

      {/* <Flex paddingTop={2} paddingLeft={2} marginTop={-12} gridArea="slider" flexDir="column" alignItems="flex-start" >
        { props.slider || <Slider onClick={handleClick} />}
      </Flex> */}

      <Flex gridArea="content" flexDir="row" alignItems="flex-center" maxWidth="100%" wrap="wrap">
        { props.content }
      </Flex>
      {/* <Flex maxHeight="100vh" gridArea="group" flexDir="row" alignItems="flex-start" justifyContent="flex-start">
        { props.group || <Group />}
      </Flex> */}

      {/* <Flex gridArea="footer" flexDir="row" alignItems="flex-start">
        { props.footer || <Footer /> }
      </Flex> */}
    </Grid>
  )
}
